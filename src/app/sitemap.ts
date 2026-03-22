import type { MetadataRoute } from "next";

const BASE = "https://tarmac.musicsian.com";

const pages = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/docs", priority: 0.9, changeFrequency: "weekly" as const },

  // Getting Started
  { path: "/docs/getting-started", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/docs/getting-started/installation", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/docs/getting-started/first-run", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/getting-started/accessibility", priority: 0.7, changeFrequency: "monthly" as const },

  // Configuration
  { path: "/docs/configuration", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/docs/configuration/settings", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/configuration/lua-api", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/configuration/hot-reload", priority: 0.7, changeFrequency: "monthly" as const },

  // Keybindings
  { path: "/docs/keybindings", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/keybindings/defaults", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/keybindings/custom-binds", priority: 0.8, changeFrequency: "monthly" as const },

  // Window Management
  { path: "/docs/window-management", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/window-management/bsp-layout", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/window-management/floating", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/window-management/focus-swap-resize", priority: 0.7, changeFrequency: "monthly" as const },

  // Workspaces
  { path: "/docs/workspaces", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/workspaces/numbered", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/workspaces/special-workspaces", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/workspaces/multi-monitor", priority: 0.7, changeFrequency: "monthly" as const },

  // IPC
  { path: "/docs/ipc", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/ipc/socket-protocol", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/ipc/tarmacctl", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/ipc/commands", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/ipc/events-subscribe", priority: 0.7, changeFrequency: "monthly" as const },

  // Single pages
  { path: "/docs/window-rules", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/system-tray", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/settings-window", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/events-hooks", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/mouse", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/docs/troubleshooting", priority: 0.7, changeFrequency: "monthly" as const },

  // ers
  { path: "/docs/ers", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/ers/overview", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/docs/ers/configuration", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/docs/ers/standalone", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
