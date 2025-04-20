export const GH_REPO = "/naurffxiv/naurffxiv";
// TODO: will need to update to naurffxiv.com when repo changes

interface GitHubRelease {
  tag_name: string;
  [key: string]: unknown;
}

export async function fetchGithubReleases(): Promise<GitHubRelease[]> {
  const url = `https://api.github.com/repos${GH_REPO}/releases`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API responded with ${response.status}: ${response.statusText}`,
      );
    }

    const releases: GitHubRelease[] = await response.json();

    // Filter out any weird entries that don't have a tag name
    const validReleases = releases.filter((rel) => rel?.tag_name);

    return validReleases;
  } catch (err) {
    console.error("Error fetching GitHub releases:", err);
    throw err;
  }
}
