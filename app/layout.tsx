import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FDE Academy",
  description:
    "A private Forward Deployed Engineer training course — six stages, embedded video lessons, quizzes and progress tracking.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
