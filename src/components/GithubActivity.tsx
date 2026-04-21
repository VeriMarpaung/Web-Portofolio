import { useEffect, useRef, useState } from 'react';

interface GithubActivityProps {
  username: string;
  profileUrl?: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

interface StatItem {
  num: number;
  label: string;
}

interface ContributionDay {
  contributionCount: number;
  contributionLevel: number;
  date: string;
  weekday: number;
}

interface ContributionCalendarData {
  totalContributions: number;
  weeks: ContributionDay[][];
}

interface GitHubActivityPayload {
  stats: StatItem[];
  repos: GitHubRepo[];
  events: GitHubEvent[];
  contributionCalendar: ContributionCalendarData | null;
  note: string | null;
}

interface PublicContributionResponse {
  total: number;
  contributions: Array<{
    date: string;
    count: number;
    level: number;
  }>;
}

function buildCalendarFromPublicContributions(input: PublicContributionResponse): ContributionCalendarData | null {
  if (!Array.isArray(input.contributions) || input.contributions.length === 0) {
    return null;
  }

  const sortedContributions = [...input.contributions].sort(
    (a, b) => new Date(`${a.date}T00:00:00Z`).getTime() - new Date(`${b.date}T00:00:00Z`).getTime()
  );

  const weeks: ContributionDay[][] = [];
  let currentWeek: Array<ContributionDay | null> = new Array(7).fill(null);

  sortedContributions.forEach((item) => {
    const date = new Date(`${item.date}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return;

    const weekday = date.getUTCDay();

    if (weekday === 0 && currentWeek.some(Boolean)) {
      weeks.push(
        currentWeek.map((day, idx) => day || {
          contributionCount: 0,
          contributionLevel: 0,
          date: `pad-${weeks.length}-${idx}`,
          weekday: idx,
        })
      );
      currentWeek = new Array(7).fill(null);
    }

    currentWeek[weekday] = {
      contributionCount: item.count,
      contributionLevel: item.level,
      date: item.date,
      weekday,
    };
  });

  if (currentWeek.some(Boolean)) {
    weeks.push(
      currentWeek.map((day, idx) => day || {
        contributionCount: 0,
        contributionLevel: 0,
        date: `pad-last-${idx}`,
        weekday: idx,
      })
    );
  }

  return {
    totalContributions: typeof input.total === 'number'
      ? input.total
      : sortedContributions.reduce((sum, item) => sum + item.count, 0),
    weeks,
  };
}

async function fetchPublicContributionCalendar(
  username: string,
  signal: AbortSignal
): Promise<ContributionCalendarData | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { signal }
    );

    if (!response.ok) return null;

    const payload = (await response.json()) as PublicContributionResponse;
    return buildCalendarFromPublicContributions(payload);
  } catch {
    return null;
  }
}

function useCountUp(target: number, triggered: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);
  return count;
}

function StatCard({ num, label, triggered }: { num: number; label: string; triggered: boolean }) {
  const count = useCountUp(num, triggered);
  return (
    <div
      className="rounded-xl p-6 text-center transition-all duration-300"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <span className="block font-display font-extrabold text-4xl" style={{ color: 'var(--accent)' }}>
        {count.toLocaleString()}
      </span>
      <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  );
}

function formatEventType(type: string) {
  const map: Record<string, string> = {
    PushEvent: 'Pushed commits',
    PullRequestEvent: 'Opened or updated PR',
    IssuesEvent: 'Worked on issues',
    IssueCommentEvent: 'Commented on issues',
    PullRequestReviewEvent: 'Reviewed pull request',
    WatchEvent: 'Starred a repository',
    CreateEvent: 'Created branch/tag/repo',
    ForkEvent: 'Forked repository',
    ReleaseEvent: 'Published release',
  };

  return map[type] || type.replace('Event', '');
}

function formatRelativeDate(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const hour = 1000 * 60 * 60;
  const day = hour * 24;

  if (diff < hour) return 'less than an hour ago';
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  if (diff < day * 7) return `${Math.floor(diff / day)}d ago`;

  return new Date(date).toLocaleDateString();
}

function ContributionCalendar({ calendar }: { calendar: ContributionCalendarData }) {
  const levelColors = [
    'var(--bg-3)',
    'rgba(108,209,235,0.25)',
    'rgba(108,209,235,0.45)',
    'rgba(108,209,235,0.65)',
    'rgba(108,209,235,0.9)',
  ];

  return (
    <div className="rounded-2xl p-6 mt-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
          Contribution Calendar
        </h3>
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          {calendar.totalContributions.toLocaleString()} contributions in the last 12 months
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-[3px] min-w-max">
          {calendar.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid gap-[3px]" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.contributionCount} contribution(s)`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: levelColors[day.contributionLevel] || levelColors[0],
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 font-mono text-xs mt-4" style={{ color: 'var(--text-dim)' }}>
        Less
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} style={{ width: 12, height: 12, borderRadius: 2, background: levelColors[level] }} />
        ))}
        More
      </div>
    </div>
  );
}

export default function GithubActivity({ username, profileUrl }: GithubActivityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [calendar, setCalendar] = useState<ContributionCalendarData | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!username) {
      setError('GitHub username is missing.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchJsonSafe<T>(url: string): Promise<T | null> {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) return null;
        return (await response.json()) as T;
      } catch {
        return null;
      }
    }

    async function loadPublicFallback() {
      const [userData, repoData, prData, eventData, publicCalendar] = await Promise.all([
        fetchJsonSafe<GitHubUser>(`https://api.github.com/users/${username}`),
        fetchJsonSafe<GitHubRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        fetchJsonSafe<{ total_count: number }>(`https://api.github.com/search/issues?q=author:${username}+type:pr`),
        fetchJsonSafe<GitHubEvent[]>(`https://api.github.com/users/${username}/events/public?per_page=8`),
        fetchPublicContributionCalendar(username, controller.signal),
      ]);

      const repos = Array.isArray(repoData) ? repoData : [];
      const eventsData = Array.isArray(eventData) ? eventData : [];
      const hasAnyData = Boolean(userData || repos.length || eventsData.length || publicCalendar);

      if (!hasAnyData) {
        throw new Error('Unable to fetch GitHub activity. GitHub API may be rate-limited on your network.');
      }

      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const nonForkRepos = repos.filter(repo => !repo.fork);

      const notes: string[] = [];
      if (publicCalendar) {
        // notes.push('Contribution calendar loaded from public mode. Set GITHUB_TOKEN in Netlify env for the most accurate private/public aggregation.');
        notes.push('Contribution calendar loaded from public mode.');

      } else {
        notes.push('Using public GitHub API mode. Add GITHUB_TOKEN in Netlify env to enable 12-month contribution calendar.');
      }
      if (!userData || !prData || !eventData || !repoData) {
        notes.push('Some metrics may be partial due to GitHub API rate limits in local mode.');
      }

      setStats([
        {
          num: publicCalendar?.totalContributions ?? userData?.followers ?? 0,
          label: publicCalendar ? 'Contributions (12m)' : 'Followers',
        },
        { num: userData?.public_repos ?? repos.length, label: 'Public Repositories' },
        { num: totalStars, label: 'Total Stars' },
        { num: prData?.total_count || 0, label: 'Public Pull Requests' },
      ]);
      setRepos(nonForkRepos.slice(0, 6));
      setEvents(eventsData);
      setCalendar(publicCalendar);
      setNote(notes.join(' '));
    }

    async function loadGitHubData() {
      setLoading(true);
      setError(null);
      setNote(null);

      try {
        const endpoint = `/.netlify/functions/github-activity?username=${encodeURIComponent(username)}`;
        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          await loadPublicFallback();
          return;
        }

        const payload = (await response.json()) as GitHubActivityPayload;
        setStats(payload.stats || []);
        setRepos(payload.repos || []);
        setEvents(payload.events || []);
        setCalendar(payload.contributionCalendar || null);
        setNote(payload.note || null);
      } catch (err) {
        if (controller.signal.aborted) return;

        try {
          await loadPublicFallback();
        } catch (fallbackErr) {
          const message = fallbackErr instanceof Error ? fallbackErr.message : 'Unknown error.';
          setError(message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadGitHubData();

    return () => controller.abort();
  }, [username]);

  return (
    <section id="github" className="py-24" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-5xl mx-auto px-8">
        <div className="section-label">Open Source</div>
        <h2
          className="font-display font-bold mb-3 leading-tight"
          style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)' }}
        >
          GitHub Activity
        </h2>
        <p className="mb-10" style={{ color: 'var(--text-muted)', maxWidth: 560 }}>
          Real-time public data from GitHub API for
          {' '}
          <a
            href={profileUrl || `https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            style={{ color: 'var(--accent)' }}
          >
            @{username}
          </a>
          .
        </p>

        <div ref={ref}>
          {loading && (
            <div
              className="rounded-2xl p-6 mb-8"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              Loading GitHub activity...
            </div>
          )}

          {error && (
            <div
              className="rounded-2xl p-6 mb-8"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p style={{ color: 'var(--text)' }}>Failed to load GitHub data: {error}</p>
              <a
                href={profileUrl || `https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-3 font-mono text-xs"
                style={{ color: 'var(--accent)' }}
              >
                Open profile instead →
              </a>
            </div>
          )}

          {!loading && !error && note && (
            <div
              className="rounded-2xl p-4 mb-6 font-mono text-xs"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              {note}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map(s => (
                  <StatCard key={s.label} {...s} triggered={triggered} />
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <h3 className="font-display font-bold text-xl mb-4" style={{ color: 'var(--text)' }}>
                    Recent Repositories
                  </h3>
                  <div className="space-y-4">
                    {repos.map(repo => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-xl p-4 transition-colors"
                        style={{ border: '1px solid var(--border)' }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="font-mono text-sm" style={{ color: 'var(--text)' }}>
                            {repo.name}
                          </span>
                          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                            ★ {repo.stargazers_count}
                          </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                          {repo.description || 'No description provided.'}
                        </p>
                        <div className="flex items-center justify-between font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                          <span>{repo.language || 'N/A'}</span>
                          <span>Updated {formatRelativeDate(repo.updated_at)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <h3 className="font-display font-bold text-xl mb-4" style={{ color: 'var(--text)' }}>
                    Recent Public Activity
                  </h3>
                  <ul className="space-y-3">
                    {events.map(event => (
                      <li
                        key={event.id}
                        className="rounded-xl p-4"
                        style={{ border: '1px solid var(--border)' }}
                      >
                        <div className="font-mono text-xs mb-1" style={{ color: 'var(--accent)' }}>
                          {formatEventType(event.type)}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text)' }}>
                          {event.repo.name}
                        </div>
                        <div className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          {formatRelativeDate(event.created_at)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {calendar && <ContributionCalendar calendar={calendar} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
