// src/app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

/** Fonte (carrega rápido; sem FOIT) */
const inter = Inter({ subsets: ['latin'], display: 'swap' });

/** Resolve URL pública do site de forma defensiva */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL, // pode existir em alguns contextos da Vercel
    process.env.VERCEL_URL, // geralmente sem protocolo
  ].filter(Boolean) as string[];

  for (const v of candidates) {
    const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
    try {
      // garante que é uma URL válida
      return new URL(withProto).toString();
    } catch {
      // tenta o próximo candidato
    }
  }
  // fallback local
  return 'http://localhost:3000';
}

const SITE_URL = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Devcore', template: '%s • Devcore' },
  description: 'Blog com tirinhas e UX acessível',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Devcore',
    siteName: 'Devcore',
    description: 'Blog com tirinhas e UX acessível',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devcore',
    description: 'Blog com tirinhas e UX acessível',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f1b2d' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Aplica “modo calmo” antes da hidratação (evita flicker do Matrix) */}
        <Script id="prefers-calm" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("dc.calm")==="1"){document.documentElement.classList.add("mode-calm");}}catch(_){}}
          `}
        </Script>
      </head>
      <body
        className={[
          inter.className,
          'h-full flex flex-col', // << garantir 100% da altura
          'bg-[--surface] text-[--text]',
          'antialiased selection:bg-[color:var(--brand-700)]/50 selection:text-white',
          'scroll-smooth',
        ].join(' ')}
      >
        {/* A11y: permite pular navegação fixa */}
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>

        <SiteHeader />

        {/* Compensação do header fixo usando a MESMA var de altura */}
        <main
          id="conteudo"
          role="main"
          className="
            flex-1 mx-auto w-full max-w-6xl px-4 py-8
            pt-[var(--header-h,72px)]
            scroll-mt-[var(--header-h,72px)]
          "
        >
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
