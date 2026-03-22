"use client";

import { useState } from "react";
import ShellHighlighter from "./ShellHighlighter";

type TabKey = "curl" | "homebrew" | "source";

const installCommands: Record<TabKey, { label: string; commands: string[] }> = {
  curl: {
    label: "curl",
    commands: ["curl -fsSL https://tarmac.musicsian.com/install.sh | bash"],
  },
  homebrew: {
    label: "Homebrew",
    commands: [
      "brew tap gardesk/tap",
      "brew install ers",
      "brew install tarmac",
    ],
  },
  source: {
    label: "Source",
    commands: [
      "git clone https://github.com/gardesk/tarmac.git",
      "cd tarmac && cargo build --release",
      "# binary at ./target/release/tarmac",
    ],
  },
};

export default function Terminal() {
  const [activeTab, setActiveTab] = useState<TabKey>("curl");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const commands = installCommands[activeTab].commands
      .filter((cmd) => !cmd.startsWith("#"))
      .join("\n");
    navigator.clipboard.writeText(commands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal text-left max-w-2xl mx-auto">
      <div className="terminal-header">
        <div className="flex gap-1.5">
          <span className="terminal-dot bg-red-500" />
          <span className="terminal-dot bg-yellow-500" />
          <span className="terminal-dot bg-green-500" />
        </div>
        <div className="flex-1 flex gap-1 ml-4 overflow-x-auto">
          {(Object.keys(installCommands) as TabKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === key
                  ? "bg-surface-700 text-surface-100"
                  : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
              }`}
            >
              {installCommands[key].label}
            </button>
          ))}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-surface-400 hover:text-surface-200 text-xs px-2"
          title="Copy to clipboard"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="terminal-content">
        {installCommands[activeTab].commands.map((cmd, i) => (
          <div key={i} className="flex">
            {!cmd.startsWith("#") && (
              <span className="text-green-500 mr-2 select-none">$</span>
            )}
            <ShellHighlighter code={cmd} />
          </div>
        ))}
      </div>
    </div>
  );
}
