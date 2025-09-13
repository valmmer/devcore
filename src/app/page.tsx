// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Page() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      likes: true,
      thumbs: true,
      laugh: true,
      wow: true,
      party: true,
    },
    orderBy: { id: 'asc' },
  });

  return (
    // ⬇️ ATIVA container queries e centraliza conteúdo
    <main className="cq px-4 py-10 max-w-6xl mx-auto" style={{ paddingTop: 'calc(var(--header-h) + 1.5rem)' }}>
      <section className="grid-cards">
        {posts.map((p) => (
          <PostCard
            key={p.id}
            data={{
              id: p.id,
              title: p.title,
              content: p.content,
              slug: p.slug,
              reactions: {
                heart: p.likes,
                thumbs: p.thumbs,
                laugh: p.laugh,
                wow: p.wow,
                party: p.party,
              },
            }}
          />
        ))}
      </section>
    </main>
  );
}
