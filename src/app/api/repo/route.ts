import { NextResponse } from "next/server";

interface RepoInfo {
  stars: number;
  forks: number;
  openIssues: number;
  lastCommit: string;
  lastCommitMessage: string;
  defaultBranch: string;
  description: string;
}

const REPO = "gardesk/tarmac";
const CACHE_TTL = 300_000; // 5 minutes

let cache: { data: RepoInfo; timestamp: number } | null = null;

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const headers: Record<string, string> = {
    "User-Agent": "tarmac-web",
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [repoRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`, { headers }),
      fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, {
        headers,
      }),
    ]);

    if (!repoRes.ok || !commitsRes.ok) {
      if (cache) return NextResponse.json(cache.data);
      return NextResponse.json(
        { error: "GitHub API error" },
        { status: 502 },
      );
    }

    const repo = await repoRes.json();
    const commits = await commitsRes.json();

    const data: RepoInfo = {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      lastCommit: commits[0]?.commit?.committer?.date ?? "",
      lastCommitMessage:
        commits[0]?.commit?.message?.split("\n")[0] ?? "",
      defaultBranch: repo.default_branch,
      description: repo.description ?? "",
    };

    cache = { data, timestamp: Date.now() };
    return NextResponse.json(data);
  } catch {
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json(
      { error: "Failed to fetch repo info" },
      { status: 502 },
    );
  }
}
