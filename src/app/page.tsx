import Link from "next/link";
import Terminal from "@/components/Terminal";
import ComparisonTable from "@/components/ComparisonTable";

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
        {title}
      </h3>
      <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="hero-bg min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-bold text-surface-900 dark:text-surface-100">
            tarmac
          </span>
          <div className="flex gap-6 text-sm">
            <Link
              href="/docs/getting-started"
              className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/docs/getting-started/installation"
              className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
            >
              Install
            </Link>
            <a
              href="https://github.com/gardesk/tarmac"
              className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="card inline-block px-12 py-10 mb-8">
            <h1 className="text-5xl font-bold text-surface-900 dark:text-surface-100 tracking-tight">
              tarmac
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-2 float-right">
              ...with ers
            </p>
            <div className="clear-both" />
            <p className="text-lg text-surface-600 dark:text-surface-400 mt-4 max-w-xl">
              A keyboard-driven tiling window manager for macOS, written in Rust.
              BSP layouts, Lua configuration, IPC, and window borders via ers.
            </p>
          </div>

          {/* Install terminal */}
          <div className="mt-8">
            <Terminal />
          </div>
        </section>

        {/* Feature cards */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="BSP tiling"
              description="Binary space partition layout engine. Windows split automatically based on container aspect ratio. Resize splits, equalize, or float individual windows."
            />
            <FeatureCard
              title="Lua configuration"
              description="Configure everything in ~/.config/tarmac/init.lua. Set keybindings, window rules, gaps, borders, and event hooks. Hot reload with a keybind."
            />
            <FeatureCard
              title="IPC & scripting"
              description="Full IPC over Unix socket. Query window state, subscribe to events, and control tarmac from shell scripts or external tools via tarmacctl."
            />
            <FeatureCard
              title="Workspaces & scratchpads"
              description="10 numbered workspaces per monitor plus named special workspaces (scratchpads) with configurable size and position. Toggle them on any monitor."
            />
            <FeatureCard
              title="Window borders via ers"
              description="ers renders colored overlay borders around windows using SkyLight APIs. Configurable width, color, and corner radius. Focused and unfocused colors."
            />
            <FeatureCard
              title="Window rules"
              description="Match windows by app name, bundle ID, or title. Assign them to workspaces, force floating, or set initial geometry. Rules apply automatically."
            />
          </div>
        </section>

        {/* Screenshot placeholder */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="card p-0 overflow-hidden">
            <div className="screenshot-placeholder">
              <p className="text-lg font-medium mb-2">Screenshot: tarmac in action</p>
              <p className="text-sm">BSP layout with gaps, borders, and multiple workspaces</p>
              <p className="text-xs mt-4 italic">[ placeholder &mdash; add hero-screenshot.png to public/ ]</p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
              How tarmac compares
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6 text-sm">
              tarmac is macOS-only. If you&apos;re on Linux, the options below may suit you better.
              This table reflects documented features; actual behavior depends on version and configuration.
            </p>
            <ComparisonTable />
          </div>
        </section>

        {/* Getting started CTA */}
        <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
          <div className="card inline-block px-10 py-8">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              Get started
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              Read the docs, install tarmac, and start tiling.
            </p>
            <Link
              href="/docs/getting-started"
              className="inline-block bg-surface-900 dark:bg-surface-100 text-surface-100 dark:text-surface-900 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Read the docs
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-surface-500">
            <span>tarmac &mdash; macOS tiling window manager</span>
            <a
              href="https://github.com/gardesk/tarmac"
              className="hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
