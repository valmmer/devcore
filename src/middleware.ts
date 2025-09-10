// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

// Exemplo simples de rate limit em memória (Edge = volátil)
const WINDOW_MS = 60_000;
const MAX_REQS = 100;
const store = new Map<string, { ts: number; count: number }>();

function getIP(req: NextRequest): string {
  // Vercel/Edge: IP do cliente costuma vir em x-forwarded-for
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();

  // Outros cabeçalhos comuns
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export function middleware(req: NextRequest) {
  const ip = getIP(req);
  const now = Date.now();

  const rec = store.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    store.set(ip, { ts: now, count: 1 });
  } else if (rec.count >= MAX_REQS) {
    return new NextResponse('Rate limit', { status: 429 });
  } else {
    rec.count += 1;
  }

  return NextResponse.next();
}

// Evita interceptar assets estáticos
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
