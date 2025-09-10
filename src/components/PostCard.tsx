'use client';

import { useState } from 'react';
import clsx from 'clsx';

export type ReactionKey = 'thumbs' | 'heart' | 'laugh' | 'wow' | 'party';

export type PostCardData = {
  id: number | string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: string;
  // counts iniciais opcionais, por post
  reactions?: Partial<Record<ReactionKey, number>>;
};

const REACTIONS: Record<ReactionKey, { emoji: string; label: string }> = {
  thumbs: { emoji: '👍', label: 'Curtir' },
  heart: { emoji: '❤️', label: 'Amei' },
  laugh: { emoji: '😂', label: 'Risos' },
  wow: { emoji: '😮', label: 'Uau' },
  party: { emoji: '🎉', label: 'Festejar' },
};

function withDefaults(
  partial?: Partial<Record<ReactionKey, number>>
): Record<ReactionKey, number> {
  return {
    thumbs: 0,
    heart: 0,
    laugh: 0,
    wow: 0,
    party: 0,
    ...(partial ?? {}),
  };
}

export default function PostCard({ data }: { data: PostCardData }) {
  // texto completo (sem “ler mais”)
  const body = (data.content ?? data.excerpt ?? '').trim();

  // contadores + quais reações eu marquei
  const [counts, setCounts] = useState<Record<ReactionKey, number>>(() =>
    withDefaults(data.reactions)
  );
  const [mine, setMine] = useState<Set<ReactionKey>>(new Set());

  const toggleReaction = (key: ReactionKey) => {
    setCounts((prev) => {
      const selected = mine.has(key);
      const next = Math.max(0, (prev[key] ?? 0) + (selected ? -1 : 1));
      return { ...prev, [key]: next };
    });
    setMine((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <article className="card card-hover space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{data.title}</h3>
          {data.subtitle && (
            <p className="text-sm text-[--muted]">{data.subtitle}</p>
          )}
        </div>
        <span className="badge">Tirinha</span>
      </div>

      <div>
        <p className="text-sm text-[--muted] whitespace-pre-line">{body}</p>
      </div>

      {/* Barra de reações */}
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(REACTIONS) as Array<ReactionKey>).map((key) => {
          const { emoji, label } = REACTIONS[key];
          const selected = mine.has(key);
          const count = counts[key] ?? 0;

          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              title={selected ? `Remover reação: ${label}` : `Marcar: ${label}`}
              onClick={() => toggleReaction(key)}
              className={clsx(
                'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs border transition-colors',
                selected
                  ? 'bg-[color:var(--brand-600)]/30 border-[color:var(--brand-400)] text-white'
                  : 'bg-white/5 border-white/10 text-[--muted] hover:bg-white/10'
              )}
            >
              <span aria-hidden>{emoji}</span>
              <span>{count}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
