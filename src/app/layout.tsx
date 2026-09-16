import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { portfolioData } from '@/data/portfolioData';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { BackgroundGrid } from '@/components/ui/BackgroundGrid';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abdurrahmanmaqsood.in'),
  title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
  description: portfolioData.personal.subheadline,
  keywords: [
    'Abdur Rahman Maqsood',
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'React Native',
    'Next.js',
    'TypeScript',
    'Three.js',
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'AI Integration',
    'LLM',
    'WhatsApp Automation',
  ],
  authors: [{ name: portfolioData.personal.name, url: 'https://abdurrahmanmaqsood.in' }],
  creator: portfolioData.personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdurrahmanmaqsood.in',
    title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
    description: portfolioData.personal.subheadline,
    siteName: `${portfolioData.personal.name} Portfolio`,
    images: [
      {
        url: '/images/profile.jpg',
        width: 1200,
        height: 630,
        alt: `${portfolioData.personal.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
    description: portfolioData.personal.subheadline,
    images: ['/images/profile.jpg'],
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.personal.name,
    jobTitle: portfolioData.personal.title,
    description: portfolioData.personal.subheadline,
    url: 'https://abdurrahmanmaqsood.in',
    sameAs: [
      portfolioData.personal.socials.github,
      portfolioData.personal.socials.linkedin,
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#050508] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        <BackgroundGrid />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
