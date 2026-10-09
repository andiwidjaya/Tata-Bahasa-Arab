import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: {
    default: "Nahwu Shorof Academy - Belajar Bahasa Arab Interaktif",
    template: "%s | Nahwu Shorof Academy",
  },
  description:
    "Platform pembelajaran Tata Bahasa Arab (Nahwu & Shorof) interaktif berbasis materi audio, kuis interaktif, mini-games edukatif, dan tracking progress.",
  keywords: [
    "Bahasa Arab",
    "Nahwu",
    "Shorof",
    "Belajar Bahasa Arab",
    "Tashrif",
    "Irab",
    "Kaidah Arab",
    "Edukasi Islam",
  ],
  authors: [{ name: "Nahwu Shorof Academy Team" }],
  openGraph: {
    title: "Nahwu Shorof Academy - Belajar Bahasa Arab Interaktif",
    description:
      "Kuasai kaidah Nahwu & Shorof dengan mudah melalui audio pelafalan, kuis interaktif, dan mini games seru.",
    url: "https://nahwu-shorof-academy.vercel.app",
    siteName: "Nahwu Shorof Academy",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahwu Shorof Academy",
    description: "Platform Belajar Nahwu & Shorof Interaktif Bahasa Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${amiri.variable}`}>
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
