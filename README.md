# Devcore

> Blog com tirinhas e UX acessível — **Next.js 15 + Tailwind CSS v4**.  
> Layout **escuro por padrão**, header/rodapé estáveis com zoom, **efeito Matrix** (sensível a preferências) e **Modo Calmo**.

---

## 📚 Sumário
- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar localmente](#-como-rodar-localmente)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Configuração do Tailwind v4](#-configuração-do-tailwind-v4)
- [Tema escuro forçado](#-tema-escuro-forçado)
- [Componentes](#-componentes)
- [Acessibilidade & Modo Calmo](#-acessibilidade--modo-calmo)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Deploy na Vercel (GUI e CLI)](#-deploy-na-vercel-gui-e-cli)
- [Dicas de produção](#-dicas-de-produção)
- [Problemas comuns](#-problemas-comuns)
- [Licença](#-licença)

---

## 🎯 Visão Geral
Projeto de blog minimalista/acessível com:
- **UX acessível** (skip link, foco visível, contraste, motion-safe)
- **Layout resiliente ao zoom** (header fixo com medição real da altura)
- **Tailwind v4** com `@tailwindcss/postcss`
- **Efeito Matrix** (modo calmo + `prefers-reduced-motion`)
- **Tema escuro forçado** (ignora `prefers-color-scheme: light`)

---

## 🧰 Tecnologias
- Next.js 15 (App Router)
- Tailwind CSS v4
- PostCSS: `@tailwindcss/postcss` + `autoprefixer`
- TypeScript
- `next/image`

---

## ✅ Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm/pnpm/yarn

---

## 🧪 Como rodar localmente
```bash
npm i
npm run dev        # http://localhost:3000
npm run build
npm start
```

---

## 🗂 Estrutura de pastas
```
src/
  app/
    layout.tsx          # layout raiz (tema escuro, head/meta, header/footer)
    globals.css         # Tailwind v4 + tokens + utilidades + Matrix
    page.tsx            # Home com grid de cards
    (public)/
      about/page.tsx    # Página Sobre (exemplo)
  components/
    MatrixRain.tsx      # canvas do efeito Matrix (header/footer)
    PostCard.tsx        # card de post com reações
    SiteHeader.tsx      # header fixo, medição de altura, frase inspiracional
    SiteFooter.tsx      # footer compacto com Matrix
public/
  img/logo/logdev.jpeg  # logo usada por next/image
postcss.config.js
```

---

## 🧩 Configuração do Tailwind v4

**postcss.config.js**
```js
/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // plugin do Tailwind v4
    autoprefixer: {},            // recomendado
  },
};
```

**globals.css** (topo)
```css
@import "tailwindcss";
/* … tokens/utilitários … */
```

---

## 🌑 Tema escuro forçado
No `globals.css` aplique o claro somente quando **não** houver `.force-dark`:
```css
@media (prefers-color-scheme: light){
  :root:not(.force-dark){
    --surface:#ffffff; --surface-2:#f6f8fb;
    --text:#101418;    --muted:#566071;
  }
}
```
Em `layout.tsx`:
```tsx
<html lang="pt-BR" suppressHydrationWarning className="force-dark">
```

---

## 🧱 Componentes
**SiteHeader**: fixo, Matrix discreto, frase no cliente, mede altura real e grava `--header-h`.  
**SiteFooter**: compacto (`py-2`, `text-xs`), Matrix.  
**PostCard**: conteúdo completo + reações (👍 ❤️ 😂 😮 🎉).  
**MatrixRain**: respeita `prefers-reduced-motion` e `mode-calm`.

---

## ♿ Acessibilidade & Modo Calmo
- Skip link (“Pular para o conteúdo”)
- `:focus-visible` com outline
- **Modo Calmo** (reduz Matrix):
  ```js
  localStorage.setItem('dc.calm', '1');     // ativa
  localStorage.removeItem('dc.calm');       // desativa
  ```
- Script aplica classe antes da hidratação (sem flicker).

---

## 🔐 Variáveis de ambiente
- `NEXT_PUBLIC_SITE_URL` — URL pública (ex.: `https://devcore-ux.vercel.app`).  
  Usada em metadados/OG/canonical.

Para puxar envs da Vercel:
```bash
vercel env pull .env.local
```

---

## 🚀 Deploy na Vercel (GUI e CLI)

### GUI
1. Importar repo → Vercel detecta Next.js.
2. Em Settings → Environment Variables: `NEXT_PUBLIC_SITE_URL=https://<seu>.vercel.app`
3. Deploy (Preview) → Promote to Production.

### CLI
```bash
npm i -g vercel
vercel login

rm -rf .vercel                  # garante que não há link antigo
vercel --prod                   # crie projeto novo (não linke a existente)
# copie a Production URL exibida

vercel env add NEXT_PUBLIC_SITE_URL production
# cole a URL completa, com https://

vercel --prod
```

> A CLI mostra dois links: **Production** (`*.vercel.app`) é público; **Inspect** pede login.

---

## 🧪 Dicas de produção
- Se blur gerar flicker em alguns devices, remova `backdrop-blur` e mantenha `bg-[...]/85`.
- Mantenha `public/` versionado (logo etc.).
- `.gitignore` típico para Next/Vercel:
  ```gitignore
  node_modules/
  .next/
  .vercel/
  .env*
  out/
  dist/
  ```

---

## 🐞 Problemas comuns
| Sintoma | Causa | Solução |
| --- | --- | --- |
| `Invalid URL` no build | `NEXT_PUBLIC_SITE_URL` inválida | Defina URL completa com `https://` ou use `resolveSiteUrl()` (já incluso) |
| Pede login ao abrir | Você abriu o link **Inspect** | Use a URL **Production** |
| Tema claro em produção | Preferência do OS aplicando claro | Classe `.force-dark` no `<html>` + `:root:not(.force-dark)` no CSS |

---

## 📄 Licença
MIT — fique à vontade para usar e adaptar com créditos.
