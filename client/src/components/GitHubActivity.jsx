import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const username = 'Rohanpathak-18';
const profileUrl = `https://github.com/${username}`;

function makeWeeks(contributions = []) {
  if (!contributions.length) return [];

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
  }).format(new Date(`${date}T12:00:00`));
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState(null);
  const [publicContributionData, setPublicContributionData] = useState(null);
  const [contributionError, setContributionError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      try {
        const response = await fetch('/api/github-activity', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Private contribution data unavailable');
        setActivity(await response.json());
      } catch (error) {
        if (error.name === 'AbortError') return;

        try {
          const response = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
            { signal: controller.signal },
          );
          if (!response.ok) throw new Error('Contribution data unavailable');
          setPublicContributionData(await response.json());
        } catch (fallbackError) {
          if (fallbackError.name !== 'AbortError') setContributionError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadContributions();
    return () => controller.abort();
  }, []);

  const contributions = activity?.contributions || publicContributionData?.contributions;
  const weeks = makeWeeks(contributions);
  const total = activity?.totalContributions ?? publicContributionData?.total?.lastYear;

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
                  {total == null
                    ? 'Past year'
                    : `${total.toLocaleString()} contributions in the past year`}
                </h3>
              </div>
              <span className="github-panel-period">LAST 12 MONTHS</span>
            </div>

            {contributionError ? (
              <a className="github-fallback" href={profileUrl} target="_blank" rel="noreferrer">
                The contribution graph is unavailable. View it on GitHub.
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
        </div>
        <div className="github-section-foot">
          <span>PRIVATE CONTRIBUTION TOTALS REQUIRE SERVER-SIDE TOKEN</span>
          <span>UPDATED AUTOMATICALLY</span>
        </div>
      </div>
    </section>
  );
}
