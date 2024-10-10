const REPO = "d3/d3";

export default {
  async load() {
    let stargazers_count;
    try {
      ({stargazers_count} = await github(`/repos/${REPO}`));
    } catch (error) {
      if (process.env.CI) throw error;
      stargazers_count = NaN;
    }
    return stargazers_count;
  }
};

async function github(
  path,
  {
    authorization = process.env.GITHUB_TOKEN && `token ${process.env.GITHUB_TOKEN}`,
    accept = "application/vnd.github.v3+json"
  } = {}
) {
  const url = new URL(path, "https://api.github.com");
  const headers = {...(authorization && {authorization}), accept};
  const response = await fetch(url, {headers});
  if (!response.ok) throw new Error(`fetch error: ${response.status} ${url}`);
  return await response.json();
}