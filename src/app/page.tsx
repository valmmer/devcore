// src/app/page.tsx
import PostCard, { PostCardData } from '@/components/PostCard';

async function getPosts(): Promise<PostCardData[]> {
  return [
    {
      id: 1,
      title: 'Daily de 15 min que virou seminário',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Falei “ontem estudei”. Perguntaram: fontes, referências e benchmarks? Anotei durante o dia e no fim escrevi um resumo com links. No outro dia, a daily foi objetiva e ninguém pediu slides.',
      reactions: { thumbs: 3, heart: 2, laugh: 1 },
    },
    {
      id: 2,
      title: 'Meu primeiro bug em produção (ops)',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Era só um if… faltando um else. Aprendi feature flags e logs com contexto. Hoje aciono o flag, observo métricas, e só então libero 100%.',
      reactions: { thumbs: 4, wow: 1 },
    },
    {
      id: 3,
      title: 'Dia 1 de estágio: cadê a branch certa?',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Entrei no repo, dei git pull… e qual branch é ‘legacy-final-final-v3’? Fizemos um guia de branches e automatizamos nome de PR. Menos caos, mais merge.',
      reactions: { laugh: 2, thumbs: 1 },
    },
    {
      id: 4,
      title: 'Quando o ‘console.log’ vira melhor amigo',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Debuguei no escuro. Criei um util de log com níveis e tags. O time inteiro adotou e o suporte agradeceu.',
      reactions: { thumbs: 5, heart: 1 },
    },
    {
      id: 5,
      title: 'PR rejeado 3x, aprovado na 4ª',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Coloquei contexto, passos de teste e prints no PR. Em vez de ping-pong, veio um “LGTM”. Documentar é acelerar aprovação.',
      reactions: { party: 3, heart: 1 },
    },
    {
      id: 6,
      title: 'A mágica do ‘README local’',
      subtitle: 'Tirinhas do Devcore',
      content:
        'Escrevi um passo a passo de setup local. Na semana seguinte subi tudo do zero em 10 minutos. README é presente pro seu eu do futuro.',
      reactions: { thumbs: 2, party: 2 },
    },
  ];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Tirinhas do Devcore</h1>
        <p className="text-[--muted]">
          Histórias reais de dev júnior com UX acessível e sem navegação
          desnecessária.
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
