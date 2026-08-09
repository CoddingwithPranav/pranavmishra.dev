import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar/navbar';
import Footer from '@/components/footer/Footer';

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = 'https://portfolio.pranavmishra.dev';
const siteTitle = 'Pranav Mishra — Full Stack TypeScript Developer';
const siteDescription =
  'Full Stack Developer in Kathmandu building scalable web applications with TypeScript, ' +
  'Angular, React and Next.js on Node.js and PostgreSQL — plus agentic AI and MCP on the side.';

// Every other page in this app is a client component and so cannot export its
// own metadata. This is the only metadata the site gets.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'Pranav Mishra',
    'Full Stack Developer',
    'TypeScript',
    'Next.js',
    'Angular',
    'React',
    'Node.js',
    'Kathmandu',
  ],
  authors: [{ name: 'Pranav Mishra', url: siteUrl }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Pranav Mishra',
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/profile.png', width: 566, height: 800, alt: 'Pranav Mishra' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/profile.png'],
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
          <Navbar />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}
