'use client';

import Link from 'next/link';
import Image from 'next/image';
import MatrixRain from '@/components/MatrixRain';

export default function SiteFooter() {
  return (
    <footer className="mt-6 border-t border-white/10 relative isolate">
      {/* Matrix atrás (um pouco mais fraco) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ opacity: 'calc(var(--matrix-opacity) * 0.7)' }}
      >
        <MatrixRain className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface)]/60 via-transparent to-transparent" />
      </div>

      {/* Conteúdo compacto */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/img/logo/logdev.jpeg"
            alt="Devcore"
            width={36}
            height={36}
            className="rounded-md object-cover w-7 h-7 sm:w-8 sm:h-8"
          />
          <span className="font-semibold hidden xs:inline">Devcore</span>
        </Link>

        <nav aria-label="Rodapé" className="flex items-center gap-2">
          <Link
            className="text-[--muted] hover:text-white hover:underline underline-offset-4 transition-colors"
            href="/privacy"
          >
            Privacidade
          </Link>
          <span className="text-[--muted] select-none">•</span>
          <Link
            className="text-[--muted] hover:text-white hover:underline underline-offset-4 transition-colors"
            href="/terms"
          >
            Termos
          </Link>
          <span className="text-[--muted] select-none">•</span>
          <a
            className="text-[--muted] hover:text-white hover:underline underline-offset-4 transition-colors"
            href="mailto:contato@devcore.app"
          >
            Contato
          </a>
        </nav>
      </div>
    </footer>
  );
}
