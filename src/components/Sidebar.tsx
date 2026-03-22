"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    children: [
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "First Run", href: "/docs/getting-started/first-run" },
      { title: "Accessibility", href: "/docs/getting-started/accessibility" },
    ],
  },
  {
    title: "Configuration",
    href: "/docs/configuration",
    children: [
      { title: "Settings", href: "/docs/configuration/settings" },
      { title: "Lua API (gar)", href: "/docs/configuration/lua-api" },
      { title: "Hot Reload", href: "/docs/configuration/hot-reload" },
    ],
  },
  {
    title: "Keybindings",
    href: "/docs/keybindings",
    children: [
      { title: "Default Binds", href: "/docs/keybindings/defaults" },
      { title: "Custom Binds", href: "/docs/keybindings/custom-binds" },
    ],
  },
  {
    title: "Window Management",
    href: "/docs/window-management",
    children: [
      { title: "BSP Layout", href: "/docs/window-management/bsp-layout" },
      { title: "Floating Windows", href: "/docs/window-management/floating" },
      { title: "Focus, Swap & Resize", href: "/docs/window-management/focus-swap-resize" },
    ],
  },
  {
    title: "Workspaces",
    href: "/docs/workspaces",
    children: [
      { title: "Numbered Workspaces", href: "/docs/workspaces/numbered" },
      { title: "Special Workspaces", href: "/docs/workspaces/special-workspaces" },
      { title: "Multi-Monitor", href: "/docs/workspaces/multi-monitor" },
    ],
  },
  {
    title: "IPC",
    href: "/docs/ipc",
    children: [
      { title: "Socket & Protocol", href: "/docs/ipc/socket-protocol" },
      { title: "tarmacctl", href: "/docs/ipc/tarmacctl" },
      { title: "Commands", href: "/docs/ipc/commands" },
      { title: "Events & Subscribe", href: "/docs/ipc/events-subscribe" },
    ],
  },
  {
    title: "Window Rules",
    href: "/docs/window-rules",
  },
  {
    title: "ers (Borders)",
    href: "/docs/ers",
    children: [
      { title: "Overview", href: "/docs/ers/overview" },
      { title: "Configuration", href: "/docs/ers/configuration" },
      { title: "Standalone Use", href: "/docs/ers/standalone" },
    ],
  },
  {
    title: "Events & Hooks",
    href: "/docs/events-hooks",
  },
  {
    title: "Mouse",
    href: "/docs/mouse",
  },
  {
    title: "Troubleshooting",
    href: "/docs/troubleshooting",
  },
];

function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li className="mb-4">
      <Link
        href={item.href}
        className={`block text-sm font-semibold mb-2 ${
          isActive
            ? "text-surface-900 dark:text-surface-100"
            : "text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100"
        }`}
      >
        {item.title}
      </Link>
      {item.children && (
        <ul className="space-y-1 border-l border-surface-200 dark:border-surface-700 ml-1">
          {item.children.map((child) => {
            const childActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`block py-1 pl-4 text-sm border-l -ml-px transition-colors ${
                    childActive
                      ? "border-surface-900 dark:border-surface-100 text-surface-900 dark:text-surface-100 font-medium"
                      : "border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:border-surface-400"
                  }`}
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav className="w-64 shrink-0 border-r border-surface-200 dark:border-surface-800 h-screen sticky top-0 overflow-y-auto p-6">
      <div className="mb-8">
        <Link
          href="/"
          className="text-lg font-bold text-surface-900 dark:text-surface-100"
        >
          tarmac
        </Link>
        <span className="text-xs text-surface-500 ml-2">docs</span>
      </div>
      <ul>
        {navigation.map((item) => (
          <NavSection key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}
