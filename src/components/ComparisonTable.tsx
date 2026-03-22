"use client";

const Check = () => <span className="text-green-500">&#10003;</span>;
const Cross = () => <span className="text-surface-400">&mdash;</span>;
const Partial = () => <span className="text-yellow-500">~</span>;

interface WM {
  name: string;
  platform: string;
  language: string;
  config: string;
  bsp: React.ReactNode;
  floating: React.ReactNode;
  ipc: React.ReactNode;
  hotReload: React.ReactNode;
  multiMonitor: React.ReactNode;
  scratchpads: React.ReactNode;
  borders: React.ReactNode;
  gaps: React.ReactNode;
  mouseSupport: React.ReactNode;
  windowRules: React.ReactNode;
  events: React.ReactNode;
}

const wms: WM[] = [
  {
    name: "tarmac",
    platform: "macOS",
    language: "Rust",
    config: "Lua",
    bsp: <Check />,
    floating: <Check />,
    ipc: <Check />,
    hotReload: <Check />,
    multiMonitor: <Check />,
    scratchpads: <Check />,
    borders: <Check />,
    gaps: <Check />,
    mouseSupport: <Check />,
    windowRules: <Check />,
    events: <Check />,
  },
  {
    name: "yabai",
    platform: "macOS",
    language: "C",
    config: "Shell",
    bsp: <Check />,
    floating: <Check />,
    ipc: <Check />,
    hotReload: <Check />,
    multiMonitor: <Check />,
    scratchpads: <Cross />,
    borders: <Partial />,
    gaps: <Check />,
    mouseSupport: <Check />,
    windowRules: <Check />,
    events: <Check />,
  },
  {
    name: "AeroSpace",
    platform: "macOS",
    language: "Swift",
    config: "TOML",
    bsp: <Check />,
    floating: <Check />,
    ipc: <Check />,
    hotReload: <Check />,
    multiMonitor: <Check />,
    scratchpads: <Cross />,
    borders: <Cross />,
    gaps: <Check />,
    mouseSupport: <Partial />,
    windowRules: <Check />,
    events: <Partial />,
  },
  {
    name: "i3",
    platform: "Linux (X11)",
    language: "C",
    config: "Custom",
    bsp: <Partial />,
    floating: <Check />,
    ipc: <Check />,
    hotReload: <Check />,
    multiMonitor: <Check />,
    scratchpads: <Check />,
    borders: <Check />,
    gaps: <Partial />,
    mouseSupport: <Check />,
    windowRules: <Check />,
    events: <Check />,
  },
  {
    name: "sway",
    platform: "Linux (Wayland)",
    language: "C",
    config: "i3-compat",
    bsp: <Partial />,
    floating: <Check />,
    ipc: <Check />,
    hotReload: <Check />,
    multiMonitor: <Check />,
    scratchpads: <Check />,
    borders: <Check />,
    gaps: <Check />,
    mouseSupport: <Check />,
    windowRules: <Check />,
    events: <Check />,
  },
  {
    name: "Hyprland",
    platform: "Linux (Wayland)",
    language: "C++",
    config: "Custom",
    bsp: <Check />,
    floating: <Check />,
    ipc: <Check />,
    hotReload: <Check />,
    multiMonitor: <Check />,
    scratchpads: <Check />,
    borders: <Check />,
    gaps: <Check />,
    mouseSupport: <Check />,
    windowRules: <Check />,
    events: <Check />,
  },
  {
    name: "bspwm",
    platform: "Linux (X11)",
    language: "C",
    config: "Shell",
    bsp: <Check />,
    floating: <Check />,
    ipc: <Check />,
    hotReload: <Check />,
    multiMonitor: <Check />,
    scratchpads: <Check />,
    borders: <Check />,
    gaps: <Check />,
    mouseSupport: <Check />,
    windowRules: <Check />,
    events: <Check />,
  },
  {
    name: "dwm",
    platform: "Linux (X11)",
    language: "C",
    config: "C (recompile)",
    bsp: <Cross />,
    floating: <Check />,
    ipc: <Cross />,
    hotReload: <Cross />,
    multiMonitor: <Check />,
    scratchpads: <Partial />,
    borders: <Check />,
    gaps: <Partial />,
    mouseSupport: <Partial />,
    windowRules: <Partial />,
    events: <Cross />,
  },
];

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-surface-100 dark:bg-surface-800">
            <th className="px-3 py-2 text-left font-semibold border border-surface-200 dark:border-surface-700">WM</th>
            <th className="px-3 py-2 text-left font-semibold border border-surface-200 dark:border-surface-700">Platform</th>
            <th className="px-3 py-2 text-left font-semibold border border-surface-200 dark:border-surface-700">Config</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">BSP</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Float</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">IPC</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Hot Reload</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Multi-Mon</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Scratchpads</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Borders</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Gaps</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Mouse</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Rules</th>
            <th className="px-3 py-2 text-center font-semibold border border-surface-200 dark:border-surface-700">Events</th>
          </tr>
        </thead>
        <tbody>
          {wms.map((wm) => (
            <tr
              key={wm.name}
              className={wm.name === "tarmac" ? "bg-accent/10 font-medium" : ""}
            >
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 font-medium">{wm.name}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400">{wm.platform}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400">{wm.config}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.bsp}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.floating}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.ipc}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.hotReload}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.multiMonitor}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.scratchpads}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.borders}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.gaps}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.mouseSupport}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.windowRules}</td>
              <td className="px-3 py-2 border border-surface-200 dark:border-surface-700 text-center">{wm.events}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-surface-500 mt-2">
        &#10003; = supported &nbsp; ~ = partial/patch &nbsp; &mdash; = not available.
        Data based on published documentation as of March 2026. Entries like &ldquo;partial&rdquo; for dwm reflect features that require patches.
      </p>
    </div>
  );
}
