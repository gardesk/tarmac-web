import type { Metadata } from "next";
import Link from "next/link";
import Terminal from "@/components/Terminal";
import GitHubStats from "@/components/GitHubStats";
import ComparisonTable from "@/components/ComparisonTable";
import FaqSchema from "@/components/FaqSchema";
import ProgressiveHero from "@/components/ProgressiveHero";

export const metadata: Metadata = {
  title: "tarmac — tiling window manager for macOS",
  description:
    "tarmac is a tiling window manager for macOS written in Rust. Automatic BSP window layouts, keyboard-driven navigation, workspaces, scratchpads, IPC, and Lua configuration. A yabai and AeroSpace alternative.",
  alternates: { canonical: "/" },
};

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
    <ProgressiveHero>
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
              A tiling window manager for macOS. Arrange windows automatically
              with BSP layouts, navigate with the keyboard, and configure
              everything in Lua.
            </p>
          </div>

          {/* Install terminal */}
          <div className="mt-8">
            <Terminal />
          </div>

          {/* GitHub stats */}
          <div className="mt-4">
            <GitHubStats />
          </div>
        </section>

        {/* What is tarmac — SEO content block */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              A tiling window manager built for macOS
            </h2>
            <div className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed space-y-3">
              <p>
                tarmac is a tiling window manager that automatically arranges
                your macOS windows into non-overlapping tiles using a binary
                space partition (BSP) algorithm. Instead of manually dragging
                and resizing windows, tarmac handles layout for you — open a
                new window and it splits the available space.
              </p>
              <p>
                Navigate between windows with keyboard shortcuts (vim-style
                hjkl or arrow keys), swap window positions, resize splits, and
                manage 10 workspaces per monitor. Named scratchpad overlays
                give you quick-access terminals or tools that toggle on and
                off.
              </p>
              <p>
                tarmac is written in Rust and configured through a single Lua
                file at <code>~/.config/tarmac/init.lua</code>. It runs as a
                background daemon, uses the macOS Accessibility API for window
                control, and exposes an IPC socket for scripting via{" "}
                <code>tarmacctl</code>.
              </p>
              <p>
                Window borders are rendered by{" "}
                <Link href="/docs/ers/overview" className="text-accent hover:underline">
                  ers
                </Link>
                , a companion process that draws colored overlays around
                windows using private SkyLight framework APIs. Borders show
                which window is focused at a glance.
              </p>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-8 text-center">
            Features
          </h2>
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
            <FeatureCard
              title="System tray & settings GUI"
              description="Menu bar icon with workspace switching. Native settings window with sliders for gaps, borders, and toggles for mouse behavior. Changes apply live and persist to your config."
            />
            <FeatureCard
              title="Rich events for bar integration"
              description="Events carry full workspace snapshots, window metadata, and layout state. Subscribe from shell scripts or Lua callbacks to drive status bars like sketchybar."
            />
            <FeatureCard
              title="Multi-monitor support"
              description="Each monitor gets its own set of workspaces. Focus and move windows between monitors with keybinds. Hotplug detection when displays connect or disconnect."
            />
          </div>
        </section>

        {/* Screenshot */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="card p-0 overflow-hidden rounded-xl">
            <img
              src="/hero-screenshot.png"
              alt="tarmac tiling window manager on macOS — BSP layout with gaps, borders, and multiple windows"
              width={1920}
              height={1080}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>

        {/* Comparison table */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
              How tarmac compares to other tiling window managers
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6 text-sm">
              tarmac is macOS-only. If you&apos;re on Linux, i3, sway, Hyprland, or bspwm
              are good options. On macOS, tarmac sits alongside yabai and AeroSpace
              as a keyboard-driven tiling window manager with IPC, workspaces, and scratchpads.
            </p>
            <ComparisonTable />
          </div>
        </section>

        {/* FAQ for SEO */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">
                  What is a tiling window manager?
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  A tiling window manager automatically arranges your windows so
                  they don&apos;t overlap, filling the screen in a grid-like pattern.
                  Instead of floating windows you drag around manually, a tiling WM
                  handles all positioning and sizing. You navigate and manage windows
                  with keyboard shortcuts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">
                  Does macOS have a built-in tiling window manager?
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  macOS has basic window snapping (split view), but no real tiling
                  window manager. Tools like tarmac, yabai, and AeroSpace fill this
                  gap by providing automatic window tiling, workspaces, and keyboard
                  navigation on macOS.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">
                  How is tarmac different from yabai?
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  Both are BSP-based tiling window managers for macOS with IPC
                  support. tarmac is written in Rust, uses Lua for configuration,
                  and includes built-in scratchpads, a system tray, and a settings
                  GUI. yabai is written in C and configured via shell scripts.
                  tarmac also bundles ers for window borders.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">
                  Does tarmac work on Apple Silicon?
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  Yes. tarmac runs natively on both Apple Silicon (M1/M2/M3/M4) and
                  Intel Macs. It&apos;s tested on macOS Monterey through Tahoe.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">
                  Does tarmac require disabling System Integrity Protection (SIP)?
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  No. tarmac works with SIP enabled. It only requires Accessibility
                  permission, which you grant through System Settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting started CTA */}
        <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
          <div className="card inline-block px-10 py-8">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
              Get started
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              Install tarmac in one command and start tiling your macOS windows.
            </p>
            <Link
              href="/docs/getting-started"
              className="inline-block bg-surface-900 dark:bg-surface-100 text-surface-100 dark:text-surface-900 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Read the docs
            </Link>
          </div>
        </section>

        <FaqSchema />

        {/* Footer */}
        <footer className="border-t border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-surface-500">
            <span>tarmac &mdash; tiling window manager for macOS</span>
            <a
              href="https://github.com/gardesk/tarmac"
              className="hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </ProgressiveHero>
  );
}
