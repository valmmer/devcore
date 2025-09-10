'use client';
import { useTransition } from 'react';
import { addComment } from '@/app/actions';

export default function CommentForm({ postId }: { postId: number }) {
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) => start(() => addComment(postId, fd))}
      className="mt-4 grid gap-3"
      aria-labelledby={`comentarios-${postId}`}
    >
      <div className="grid gap-1">
        <label className="text-sm font-medium" htmlFor={`author-${postId}`}>
          Nome (opcional)
        </label>
        <input
          id={`author-${postId}`}
          name="author"
          className="dc-input"
          placeholder="Seu nome"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium" htmlFor={`body-${postId}`}>
          Comentário
        </label>
        <textarea
          id={`body-${postId}`}
          name="body"
          required
          rows={3}
          className="dc-input resize-y"
          placeholder="Escreva algo gentil ✨"
        />
      </div>

      <div>
        <button
          className="btn-primary"
          disabled={pending}
          aria-busy={pending}
          aria-live="polite"
        >
          {pending ? 'Enviando…' : 'Comentar'}
        </button>
      </div>
    </form>
  );
}
