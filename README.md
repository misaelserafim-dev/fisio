# [Nome] Fisioterapia — site

Site estático: HTML, CSS e JavaScript puros, sem dependências nem build.

```
index.html
assets/
  css/style.css      estilos (variáveis de cor no topo)
  js/main.js         menu do celular, painel de acessibilidade, parallax da abertura
  fonts/             Fraunces e DM Sans (locais, variáveis, woff2)
  images/            fotos — veja images/LEIA-ME.txt
```

## Para publicar
Envie a pasta inteira para qualquer hospedagem estática (Hostinger, Netlify, Vercel, GitHub Pages…).

## O que preencher
Procure por `[` no `index.html` e no `main.js`:
- `[NUMERO]` → telefone sem DDD (o DDD 41 já está nos links `wa.me/5541…` e `tel:+5541…`)
- `[00000-0000]` → telefone formatado para exibição
- `[Nome]` (nome da marca), `[Sobrenome]` da Noemi e do Misael, `[00000-F]` (CREFITO), `[Instituição]`, `[Especialização]`
- `[usuario]` → Instagram
- Respostas das dúvidas e horário de atendimento

## Antes de lançar
O site está **fora do Google de propósito** (`<meta name="robots" content="noindex, nofollow">`)
até tudo abaixo estar pronto.

**Domínio**
- [ ] Comprar o domínio (ex.: no registro.br)
- [ ] GitHub → Settings → Pages → Custom domain: digitar o domínio (cria o arquivo `CNAME`)
- [ ] No painel do domínio, criar os registros DNS que o GitHub pede (A para o domínio, CNAME para o `www`)
- [ ] Marcar "Enforce HTTPS" quando o certificado sair
- [ ] Trocar `https://misaelserafim-dev.github.io/fisio/` pelo domínio novo no `index.html`, `sitemap.xml` e `robots.txt`

**Conteúdo**
- [ ] Preencher todos os `[ ]` (veja "O que preencher" acima), inclusive nos dados estruturados do `<head>`
- [ ] Respostas das Dúvidas
- [ ] Fotos: `hero-bg.jpg` (WebP, ~1920 px, até ~200 KB), `noemi.jpg`, `misael.jpg`, `og-image.jpg` — veja `assets/images/LEIA-ME.txt`
- [ ] Artigos de verdade, ou tirar os links "Ler artigo" / "Ver todos"

**Lançamento**
- [ ] Trocar a meta `robots` para `index, follow, max-image-preview:large`
- [ ] Atualizar a data `lastmod` no `sitemap.xml`
- [ ] Cadastrar no Google Search Console e enviar o `sitemap.xml`
- [ ] Criar o Perfil da Empresa no Google (Google Maps)
- [ ] Testar os dados estruturados em search.google.com/test/rich-results
- [ ] Testar a prévia do link no WhatsApp

## Fontes
As fontes ficam em `assets/fonts` e são pré-carregadas no `<head>`, então não há o
"pisca" de troca de fonte que acontece com o Google Fonts. As famílias "Fallback" no
CSS ajustam o tamanho da fonte do sistema para o texto não pular enquanto carrega.
Fraunces e DM Sans são licenciadas pela SIL Open Font License.
