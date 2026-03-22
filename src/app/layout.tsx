import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tarmac.musicsian.com"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  title: {
    default: "tarmac — tiling window manager for macOS",
    template: "%s | tarmac",
  },
  description:
    "tarmac is a keyboard-driven tiling window manager for macOS written in Rust. Automatic BSP layouts, 10 workspaces, scratchpads, IPC, Lua configuration, and window borders via ers. An alternative to yabai and AeroSpace.",
  keywords: [
    "tarmac",
    "tiling window manager",
    "window manager",
    "macos window manager",
    "macos tiling",
    "tiling wm",
    "bsp layout",
    "keyboard driven",
    "yabai alternative",
    "aerospace alternative",
    "macos productivity",
    "window tiling macos",
    "rust window manager",
    "lua configuration",
    "ipc window manager",
    "macos workspaces",
    "scratchpad",
    "window borders macos",
  ],
  authors: [{ name: "gardesk" }],
  creator: "gardesk",
  publisher: "gardesk",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "tarmac — tiling window manager for macOS",
    description:
      "Keyboard-driven tiling window manager for macOS. BSP layouts, workspaces, IPC, Lua config. Written in Rust.",
    url: "https://tarmac.musicsian.com",
    siteName: "tarmac",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "tarmac — tiling window manager for macOS",
    description:
      "Keyboard-driven tiling window manager for macOS. BSP layouts, workspaces, IPC, Lua config.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "tarmac",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS",
  description:
    "A keyboard-driven tiling window manager for macOS written in Rust. Automatic BSP window layouts, workspaces, scratchpads, IPC control, and Lua configuration.",
  url: "https://tarmac.musicsian.com",
  downloadUrl: "https://tarmac.musicsian.com/install.sh",
  softwareVersion: "0.1.0",
  programmingLanguage: "Rust",
  license: "https://opensource.org/licenses/MIT",
  author: {
    "@type": "Person",
    name: "gardesk",
    url: "https://github.com/gardesk",
  },
  codeRepository: "https://github.com/gardesk/tarmac",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
