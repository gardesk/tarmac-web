const faqs = [
  {
    question: "What is a tiling window manager?",
    answer:
      "A tiling window manager automatically arranges your windows so they don't overlap, filling the screen in a grid-like pattern. Instead of floating windows you drag around manually, a tiling WM handles all positioning and sizing. You navigate and manage windows with keyboard shortcuts.",
  },
  {
    question: "Does macOS have a built-in tiling window manager?",
    answer:
      "macOS has basic window snapping (split view), but no real tiling window manager. Tools like tarmac, yabai, and AeroSpace fill this gap by providing automatic window tiling, workspaces, and keyboard navigation on macOS.",
  },
  {
    question: "How is tarmac different from yabai?",
    answer:
      "Both are BSP-based tiling window managers for macOS with IPC support. tarmac is written in Rust, uses Lua for configuration, and includes built-in scratchpads, a system tray, and a settings GUI. yabai is written in C and configured via shell scripts. tarmac also bundles ers for window borders.",
  },
  {
    question: "Does tarmac work on Apple Silicon?",
    answer:
      "Yes. tarmac runs natively on both Apple Silicon (M1/M2/M3/M4) and Intel Macs. It's tested on macOS Monterey through Tahoe.",
  },
  {
    question: "Does tarmac require disabling System Integrity Protection (SIP)?",
    answer:
      "No. tarmac works with SIP enabled. It only requires Accessibility permission, which you grant through System Settings.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
