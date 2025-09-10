'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import MatrixRain from '@/components/MatrixRain';

const links = [
  { href: '/', label: 'Início' },
  { href: '/about', label: 'Sobre' },
];

const QUOTES = [
  'Pequenos commits, grandes avanços.',
  'Documentar é acelerar o futuro.',
  'Aprender em público muda tudo.',
  'Código claro é gentileza com o time.',
  'UX começa no README.',
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/');

  const [phrase, setPhrase] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Frase só no cliente (evita mismatch SSR/CSR)
  useEffect(() => {
    let idx = Number(sessionStorage.getItem('dc.quoteIndex'));
    if (!Number.isFinite(idx)) {
      idx = Math.floor(Math.random() * QUOTES.length);
      sessionStorage.setItem('dc.quoteIndex', String(idx));
    }
    setPhrase(QUOTES[idx]);
  }, []);

  // Mede a altura real do header e atualiza --header-h (para o <main> compensar certinho)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    const onResize = () => set();
    window.addEventListener('resize', onResize);
    if (window.visualViewport)
      window.visualViewport.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      if (window.visualViewport)
        window.visualViewport.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        fixed inset-x-0 top-0 z-50 isolate
        border-b border-white/10
        bg-[color:var(--surface)]/85
        supports-[backdrop-filter]:backdrop-blur supports-[backdrop-filter]:bg-[color:var(--surface)]/60
        relative overflow-hidden will-change-transform
        min-h-[var(--header-h)]  /* altura mínima controlada por var */
      `}
    >
      {/* Matrix atrás (bem discreto) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 'var(--matrix-opacity-header)' }}
      >
        <MatrixRain className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--surface)]/80 via-transparent to-transparent" />
      </div>

      {/* Conteúdo mais compacto: py-2 */}
      <nav className="relative z-10 h-full mx-auto max-w-6xl px-4 py-2 flex items-center gap-4">
        {/* Logo + marca (logo menor) */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/img/logo/logdev.jpeg"
            alt="Devcore"
            width={56}
            height={56}
            sizes="(min-width:1024px) 56px, (min-width:640px) 48px, 40px"
            className="rounded-md object-cover w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            priority
          />
          <span className="font-semibold text-lg sm:text-xl leading-none">
            Devcore
          </span>
        </Link>

        {/* Frase: só a partir de md para não aumentar muito a altura */}
        <div
          className="flex-1 min-w-0 hidden md:flex items-center justify-center px-3"
          aria-label="Frase de inspiração"
        >
          <p
            className="text-[13px] sm:text-sm text-[--muted] italic truncate leading-tight"
            suppressHydrationWarning
            title={phrase ?? ''}
          >
            {phrase ?? '\u00A0'}
          </p>
        </div>

        {/* Navegação */}
        <ul className="flex items-center gap-4 text-sm shrink-0">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'hover:underline underline-offset-4 decoration-[--brand-400] transition-colors',
                    active
                      ? 'text-white font-medium'
                      : 'text-[--muted] hover:text-white'
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
