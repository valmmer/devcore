// prisma/seed.ts
import { PrismaClient, PostKind } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      slug: 'dia-1-de-estagio',
      title: 'Dia 1 de estágio: cadê a branch certa?',
      excerpt:
        'Entrei no repo, dei git pull… e que branch é “legacy-final-final-v3”?',
      content: `Cheguei animado. Abri o repositório e… 237 branches. O mentor: "Só não mexe na *legacy-final-final-v3*".
Claro que foi a primeira que eu *checkoutei*. Pelo menos aprendi a abrir PR sem pânico.`,
      kind: PostKind.STRIP,
    },
    {
      slug: 'bug-em-producao',
      title: 'Meu primeiro bug em produção (ops)',
      excerpt: 'Era só um if… faltando um else. Aprendi sobre *feature flags*.',
      content: `Jurei que era inofensivo. 5 minutos depois, alertas. Hoje eu adoro *feature flags* e *rollbacks*.`,
      kind: PostKind.STRIP,
    },
    {
      slug: 'daily-standup',
      title: 'Daily de 15 min que virou seminário',
      excerpt:
        'Falei “ontem estudei”. Perguntaram: “fontes, referências e benchmarks?”',
      content: `Levei 30 min explicando por que o *console.log* não era tracing. Agora tenho notas objetivas: feito, fazendo, bloqueios.`,
      kind: PostKind.STRIP,
    },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {}, // não altera se já existir
      create: p, // cria se não existir
    });
  }
}

main().finally(() => prisma.$disconnect());
