// src/app/posts/page.tsx  (ou src/app/(public)/posts/page.tsx)
import PostCard, { PostCardData } from '@/components/PostCard';

async function getPosts(): Promise<PostCardData[]> {
  return [
    {
      id: 'daily-15min',
      title: 'Daily de 15 min que virou seminário',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Falei “ontem estudei”. Perguntaram: fontes, referências e benchmarks? Anotei durante o dia e no fim escrevi um resumo com links. No outro dia, a daily foi objetiva e ninguém pediu slides.',
      reactions: { thumbs: 3, heart: 2, laugh: 1 },
    },
    {
      id: 'bug-em-producao',
      title: 'Meu primeiro bug em produção (ops)',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Era só um if… faltando um else. Aprendi feature flags e logs com contexto. Hoje aciono o flag, observo métricas, e só então libero 100%.',
      reactions: { thumbs: 4, wow: 1 },
    },
    {
      id: 'branch-certa',
      title: 'Dia 1 de estágio: cadê a branch certa?',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Entrei no repo, dei git pull… e qual branch é ‘legacy-final-final-v3’? Fizemos um guia de branches e automatizamos nome de PR. Menos caos, mais merge.',
      reactions: { laugh: 2, thumbs: 1 },
    },
  ];
}

export default async function PostsIndexPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Tirinhas</h1>
        <p className="text-[--muted]">
          Todas as tirinhas do Devcore, em uma grade rápida de ler.
        </p>
      </header>

      <section className="grid-cards">
        {posts.map((p) => (
          <PostCard key={p.id} data={p} />
        ))}
      </section>
    </div>
  );
}
