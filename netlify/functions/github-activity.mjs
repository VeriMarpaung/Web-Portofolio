const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const contributionLevelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=300',
    },
    body: JSON.stringify(body),
  };
}

async function fetchJson(url, init = {}) {
  const response = await fetch(url, init);
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`GitHub request failed (${response.status}): ${details.slice(0, 240)}`);
  }
  return response.json();
}

async function getContributionCalendar(username, githubToken) {
  if (!githubToken) return null;

  const query = `
    query ContributionCalendar($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchJson(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${githubToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { login: username },
    }),
  });

  const weeks = response?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  const totalContributions = response?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;

  if (!Array.isArray(weeks)) return null;

  return {
    totalContributions: typeof totalContributions === 'number' ? totalContributions : 0,
    weeks: weeks.map((week) =>
      week.contributionDays.map((day) => ({
        contributionCount: day.contributionCount,
        contributionLevel: contributionLevelMap[day.contributionLevel] ?? 0,
        date: day.date,
        weekday: day.weekday,
      }))
    ),
  };
}

export async function handler(event) {
  try {
    const username = event.queryStringParameters?.username?.trim();

    if (!username || !/^[A-Za-z0-9-]{1,39}$/.test(username)) {
      return json(400, { error: 'Valid username is required.' });
    }

    const githubToken = process.env.GITHUB_TOKEN;

    const [user, repos, pullRequests, events, contributionCalendar] = await Promise.all([
      fetchJson(`${GITHUB_API_BASE}/users/${username}`),
      fetchJson(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`),
      fetchJson(`${GITHUB_API_BASE}/search/issues?q=author:${username}+type:pr`),
      fetchJson(`${GITHUB_API_BASE}/users/${username}/events/public?per_page=8`),
      getContributionCalendar(username, githubToken),
    ]);

    const nonForkRepos = repos.filter((repo) => !repo.fork);
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

    const stats = [
      {
        num: contributionCalendar?.totalContributions ?? user.followers,
        label: contributionCalendar ? 'Contributions (12m)' : 'Followers',
      },
      { num: user.public_repos, label: 'Public Repositories' },
      { num: totalStars, label: 'Total Stars' },
      { num: pullRequests.total_count || 0, label: 'Public Pull Requests' },
    ];

    return json(200, {
      username,
      stats,
      repos: nonForkRepos.slice(0, 6).map((repo) => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
      })),
      events: events.map((evt) => ({
        id: evt.id,
        type: evt.type,
        repo: evt.repo,
        created_at: evt.created_at,
      })),
      contributionCalendar,
      note: contributionCalendar
        ? null
        : 'Contribution calendar unavailable. Set GITHUB_TOKEN on Netlify to enable 12-month heatmap.',
    });
  } catch (error) {
    return json(500, {
      error: 'Failed to load GitHub activity.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
