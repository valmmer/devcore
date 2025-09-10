// src/components/CommentList.tsx
import { prisma } from '@/lib/prisma';

// tipo local só com o que o componente usa
type CommentCardItem = {
  id: number;
  author: string | null;
  body: string;
  createdAt: Date;
};

export default async function CommentList({ postId }: { postId: number }) {
  const comments: CommentCardItem[] = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: 'desc' },
    take: 3,
    select: { id: true, author: true, body: true, createdAt: true }, // 👈 casa com o tipo
  });

  if (comments.length === 0) return null;

  return (
    <ul className="mt-4 space-y-3">
      {comments.map((c) => (
        <li key={c.id} className="bg-black/10 rounded-lg p-3">
          <p className="text-sm text-[color:var(--muted)]">
            {c.author || 'Anônimo'} — {c.createdAt.toLocaleString()}
          </p>
          <p className="mt-1 whitespace-pre-wrap">{c.body}</p>
        </li>
      ))}
    </ul>
  );
}
