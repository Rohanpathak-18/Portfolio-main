const username = 'Rohanpathak-18';
const apiHeaders = (token) => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
});

function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'private, no-store');
  response.end(JSON.stringify(body));
}

async function readJson(response) {
  const body = await response.json();
  if (!response.ok) throw new Error(`GitHub request failed (${response.status})`);
  return body;
}

function buildCommits(events) {
  const seen = new Set();

  return events
    .filter((event) => event.type === 'PushEvent')
    .flatMap((event) =>
      [...(event.payload?.commits || [])].reverse().map((commit, index) => {
        const isPublic = event.public !== false;
        return {
          id: `${event.id}-${index}`,
          sha: isPublic ? commit.sha : undefined,
          message: commit.message?.split('\n')[0] || 'Commit pushed',
          repo: isPublic ? event.repo.name : 'Private repository',
          url: isPublic
            ? `https://github.com/${event.repo.name}/commit/${commit.sha}`
            : null,
          isPrivate: !isPublic,
          createdAt: event.created_at,
        };
      }),
    )
    .filter((commit) => {
      if (!commit.sha || seen.has(commit.sha)) return false;
      seen.add(commit.sha);
      return true;
    });
}

export default async function githubActivityHandler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return sendJson(response, 405, { error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return sendJson(response, 503, { error: 'GitHub activity is not configured' });
  }

  const today = new Date();
  const from = new Date(today);
  from.setUTCDate(from.getUTCDate() - 364);

  const graphqlQuery = `
    query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const [identityResponse, graphResponse, ...eventResponses] = await Promise.all([
      fetch('https://api.github.com/user', { headers: apiHeaders(token) }),
      fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { ...apiHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: {
            login: username,
            from: from.toISOString(),
            to: today.toISOString(),
          },
        }),
      }),
      ...[1, 2, 3].map((page) =>
        fetch(
          `https://api.github.com/users/${username}/events?per_page=100&page=${page}`,
          { headers: apiHeaders(token) },
        ),
      ),
    ]);

    const [identity, graphData, ...eventPages] = await Promise.all([
      readJson(identityResponse),
      readJson(graphResponse),
      ...eventResponses.map(readJson),
    ]);

    if (identity.login.toLowerCase() !== username.toLowerCase()) {
      return sendJson(response, 403, { error: 'GitHub token account does not match' });
    }

    if (graphData.errors?.length) throw new Error('GitHub contribution data unavailable');

    const calendar = graphData.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) throw new Error('GitHub contribution data unavailable');

    const levelValues = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };
    const contributions = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelValues[day.contributionLevel] ?? 0,
      })),
    );

    const events = eventPages.flat();
    const commits = buildCommits(events);

    return sendJson(response, 200, {
      contributions,
      totalContributions: calendar.totalContributions,
      commits,
    });
  } catch {
    return sendJson(response, 502, { error: 'Unable to load GitHub activity' });
  }
}
