import type { Metadata } from "next";
import { Bodoni_Moda, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const editorial = Bodoni_Moda({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Hamza Imtiaz | Software Developer",
    template: "%s | Hamza Imtiaz",
  },
  description:
    "Portfolio of Hamza Imtiaz, a software developer focused on modern web applications, mobile apps, and custom digital solutions.",
  keywords: [
    "Hamza Imtiaz",
    "software developer",
    "web developer",
    "mobile app developer",
    "Karachi Pakistan",
  ],
  openGraph: {
    title: "Hamza Imtiaz | Software Developer",
    description:
      "Modern portfolio website for Hamza Imtiaz, featuring web, mobile, and custom software development work.",
    type: "website",
    locale: "en_US",
    siteName: "Hamza Imtiaz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Imtiaz",
    description: "Software developer building modern web and mobile applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} ${editorial.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#05070b] text-white">{children}</body>
    </html>
  );
}
