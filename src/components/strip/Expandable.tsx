'use client';
import { useState } from 'react';

export default function Expandable({
  excerpt,
  content,
}: {
  excerpt: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="prose whitespace-pre-wrap">{open ? content : excerpt}</p>
      <button
        className="mt-3 btn-ghost focus:outline-none"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Mostrar menos' : 'Ler mais'}
      </button>
    </div>
  );
}
