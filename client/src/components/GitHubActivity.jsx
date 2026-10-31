import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, RefreshCw } from 'lucide-react';

const username = 'Rohanpathak-18';
const profileUrl = `https://github.com/${username}`;

function makeWeeks(contributions) {
  if (!contributions?.length) return [];

  const firstDay = new Date(`${contributions[0].date}T12:00:00`).getDay();
  const days = [...Array(firstDay).fill(null), ...contributions];
  const weeks = [];

  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }

  return weeks;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

function CommitEntry({ commit }) {
  const details = (
    <>
      <span className="commit-message">{commit.message}</span>
      <span className="commit-meta">
        <span>{commit.repo}</span>
        {commit.isPrivate && <i>PRIVATE</i>}
        <time dateTime={commit.createdAt}>{formatDate(commit.createdAt)}</time>
      </span>
    </>
  );

  return (
    <li>
      {commit.url ? (
        <a href={commit.url} target="_blank" rel="noreferrer">
          {details}
        </a>
      ) : (
        <div className="commit-entry-private">{details}</div>
      )}
    </li>
  );
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState(null);
  const [publicContributionData, setPublicContributionData] = useState(null);
  const [commitsLoading, setCommitsLoading] = useState(true);
  const [contributionError, setContributionError] = useState(false);
  const [commitError, setCommitError] = useState(false);
  const publicContributionDataRef = useRef(null);

  const loadActivity = useCallback(
    async (signal) => {
      setCommitsLoading(true);
      setCommitError(false);

      try {
        const response = await fetch('/api/github-activity', {
          cache: 'no-store',
          signal,
        });
        if (!response.ok) throw new Error('GitHub activity unavailable');
        setActivity(await response.json());
      } catch (error) {
        if (error.name === 'AbortError') return;
        setCommitError(true);

        if (!publicContributionDataRef.current) {
          try {
            const fallbackResponse = await fetch(
              `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
              { signal },
            );
            if (!fallbackResponse.ok) throw new Error('Contribution data unavailable');
            const fallbackData = await fallbackResponse.json();
            publicContributionDataRef.current = fallbackData;
            setPublicContributionData(fallbackData);
          } catch (fallbackError) {
            if (fallbackError.name !== 'AbortError') setContributionError(true);
          }
        }
      } finally {
        if (!signal?.aborted) setCommitsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadActivity(controller.signal);

    return () => controller.abort();
  }, [loadActivity]);

  const contributions = activity?.contributions || publicContributionData?.contributions;
  const weeks = makeWeeks(contributions);
  const commits = activity?.commits || [];
  const lastYearTotal =
    activity?.totalContributions ?? publicContributionData?.total?.lastYear;

  return (
    <section className="github-section section" id="activity">
      <div className="shell">
        <div className="github-section-heading">
          <div>
            <span className="eyebrow">02 — THE DAILY PRACTICE</span>
            <h2>GitHub activity</h2>
          </div>
          <a href={profileUrl} target="_blank" rel="noreferrer">
            <Github size={15} /> VIEW PROFILE <ExternalLink size={13} />
          </a>
        </div>

        <div className="github-dashboard">
          <div className="github-panel contribution-panel">
            <div className="github-panel-heading">
              <div>
                <span className="eyebrow">CONTRIBUTIONS</span>
                <h3>
                  {lastYearTotal == null
                    ? 'Past year'
                    : `${lastYearTotal.toLocaleString()} contributions in the past year`}
                </h3>
              </div>
              <span className="github-panel-period">LAST 12 MONTHS</span>
            </div>

            {contributionError ? (
              <a className="github-fallback" href={profileUrl} target="_blank" rel="noreferrer">
                Activity is unavailable. Configure the server-side GitHub token to include private contributions and commits.
              </a>
            ) : (
              <div
                className="contribution-scroll"
                role="img"
                aria-label="GitHub contribution graph for the past year"
              >
                <div className="contribution-months" aria-hidden="true">
                  {weeks.map((week, index) => {
                    const day = week.find(Boolean);
                    const month = day
                      ? new Date(`${day.date}T12:00:00`).toLocaleString('en', {
                          month: 'short',
                        })
                      : '';
                    const previousDay = weeks[index - 1]?.find(Boolean);
                    const previousMonth = previousDay
                      ? new Date(`${previousDay.date}T12:00:00`).getMonth()
                      : -1;

                    return (
                      <span key={`month-${index}`}>
                        {day && new Date(`${day.date}T12:00:00`).getMonth() !== previousMonth
                          ? month
                          : ''}
                      </span>
                    );
                  })}
                </div>
                <div className="contribution-weeks">
                  {weeks.length
                    ? weeks.flatMap((week, weekIndex) =>
                        Array.from({ length: 7 }, (_, dayIndex) => {
                          const day = week[dayIndex];
                          return (
                            <span
                              key={`${weekIndex}-${dayIndex}`}
                              className="contribution-day"
                              data-level={day?.level ?? 'empty'}
                              title={
                                day
                                  ? `${day.count} contributions on ${formatDate(day.date)}`
                                  : undefined
                              }
                              aria-hidden="true"
                            />
                          );
                        }),
                      )
                    : Array.from({ length: 371 }, (_, index) => (
                        <span
                          key={`placeholder-${index}`}
                          className="contribution-day contribution-day-placeholder"
                          aria-hidden="true"
                        />
                      ))}
                </div>
              </div>
            )}

            <div className="contribution-footer">
              <span>GitHub public + private contribution history</span>
              <span className="contribution-legend" aria-label="Contribution level legend">
                Less
                {[0, 1, 2, 3, 4].map((level) => (
                  <i key={level} className="contribution-day" data-level={level} />
                ))}
                More
              </span>
            </div>
          </div>

          <div className="github-panel commits-panel">
            <div className="github-panel-heading">
              <div>
                <span className="eyebrow">RECENT COMMITS</span>
                <h3>Latest pushes</h3>
              </div>
              <div className="github-commit-controls">
                <span className="github-panel-period">PUBLIC + PRIVATE</span>
                <button
                  className="github-refresh-button"
                  type="button"
                  onClick={() => loadActivity()}
                  disabled={commitsLoading}
                >
                  <RefreshCw size={12} /> REFRESH
                </button>
              </div>
            </div>

            {commitError ? (
              <p className="github-empty-state">
                Private and public commits are unavailable. Check the server-side GitHub token setup.
              </p>
            ) : commits.length ? (
              <ul className="commit-list">
                {commits.map((commit) => (
                  <CommitEntry key={commit.id} commit={commit} />
                ))}
              </ul>
            ) : (
              <p className="github-empty-state">
                {commitsLoading ? 'Loading recent public and private commits…' : 'No recent commits found.'}
              </p>
            )}
          </div>
        </div>
        <div className="github-section-foot">
          <span>PUBLIC & PRIVATE CONTRIBUTIONS</span>
          <span>PRIVATE COMMIT MESSAGES ARE VISIBLE HERE</span>
        </div>
      </div>
    </section>
  );
}
