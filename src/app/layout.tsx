import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Founder-OSS | Systems Engineer",
  description: "Portfolio of Founder-OSS - Systems Engineering, Automation, and Open Source.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0d1117', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
