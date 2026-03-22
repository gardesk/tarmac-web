import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tarmac — macOS tiling window manager",
  description:
    "A keyboard-driven tiling window manager for macOS, written in Rust. BSP layouts, workspaces, IPC, Lua configuration.",
  keywords: [
    "tarmac",
    "window manager",
    "tiling",
    "macos",
    "rust",
    "bsp",
    "keyboard driven",
  ],
  authors: [{ name: "gardesk" }],
  openGraph: {
    title: "tarmac — macOS tiling window manager",
    description:
      "A keyboard-driven tiling window manager for macOS, written in Rust.",
    url: "https://tarmac.musicsian.com",
    siteName: "tarmac",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
