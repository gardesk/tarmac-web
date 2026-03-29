"use client";

import { useEffect, useState } from "react";

interface RepoInfo {
  stars: number;
  forks: number;
  openIssues: number;
  lastCommit: string;
  lastCommitMessage: string;
  defaultBranch: string;
  description: string;
}

const REPO_URL = "https://github.com/gardesk/tarmac";

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000,
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function GitHubStats() {
  const [data, setData] = useState<RepoInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/repo")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex gap-3 justify-center">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-7 w-20 rounded-full bg-surface-200 dark:bg-surface-700 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* Stars */}
      <a
        href={`${REPO_URL}/stargazers`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
      >
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="currentColor"
          className="opacity-60"
        >
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
        </svg>
        {data.stars}
      </a>

      {/* Forks */}
      <a
        href={`${REPO_URL}/network/members`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
      >
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="currentColor"
          className="opacity-60"
        >
          <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
        </svg>
        {data.forks}
      </a>

      {/* Last commit */}
      {data.lastCommit && (
        <a
          href={`${REPO_URL}/commits`}
          target="_blank"
          rel="noopener noreferrer"
          title={data.lastCommitMessage}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="currentColor"
            className="opacity-60"
          >
            <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
          </svg>
          updated {timeAgo(data.lastCommit)}
        </a>
      )}
    </div>
  );
}
