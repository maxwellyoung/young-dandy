import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Young Dandy Cafe | Auckland's Finest Brews and Bites",
    template: "%s | Young Dandy Cafe",
  },
  description:
    "Experience Auckland's coziest cafe serving artisanal coffee, gourmet breakfast, and lunch. Visit Young Dandy for a perfect blend of ambiance and taste.",
  keywords: ["cafe", "Auckland", "coffee", "breakfast", "lunch", "Young Dandy"],
  authors: [{ name: "Young Dandy Cafe" }],
  creator: "Young Dandy Cafe",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://www.youngdandycafe.com",
    title: "Young Dandy Cafe | Auckland's Finest Brews and Bites",
    description:
      "Experience Auckland's coziest cafe serving artisanal coffee, gourmet breakfast, and lunch.",
    siteName: "Young Dandy Cafe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Young Dandy Cafe | Auckland's Finest Brews and Bites",
    description:
      "Experience Auckland's coziest cafe serving artisanal coffee, gourmet breakfast, and lunch.",
    creator: "@youngdandycafe",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
