# Documentação Oficial do Kriol

Este repositório contém a documentação oficial da linguagem de programação KriolLang.

## Como contribuir

Contribuições são bem-vindas! Aqui está como começar:

### Pré-requisitos

- Node.js 22 ou superior
- npm ou pnpm

### Configuração local

1. Clona o repositório:

```bash
git clone https://github.com/kriol-lang/kriol-docs.git
cd kriol-docs/site
```

2. Instala as dependências:

```bash
npm install
```

3. Inicia o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em `http://localhost:4321`

### Estrutura

- `src/content/docs/` - Ficheiros Markdown com o conteúdo da documentação
- `src/assets/` - Imagens e recursos estáticos
- `src/styles/` - Estilos CSS customizados
- `astro.config.mjs` - Configuração do site

### Adicionar nova página

1. Cria um ficheiro `.md` ou `.mdx` em `src/content/docs/`
2. Adiciona o frontmatter:

```markdown
---
title: Título da Página
description: Descrição breve
---

Conteúdo aqui...
```

3. Atualiza a sidebar em `astro.config.mjs` se necessário

### Estilo de escrita

- Escreve de forma clara e directa
- Usa exemplos de código práticos
- Evita ser demasiado verboso
- Foca em ensinar, não impressionar

### Submeter mudanças

1. Cria um branch para a tua mudança
2. Faz commit das alterações
3. Abre um Pull Request

## Compilar para produção

```bash
npm run build
```

Os ficheiros compilados ficam em `dist/`

## Realce de sintaxe

A gramática Shiki do Expressive Code/Starlight vem do pacote
[kriol-syntax](https://github.com/kriol-lang/kriol-syntax), a fonte única da
sintaxe da linguagem, e é carregada em `site/astro.config.mjs`. Blocos Markdown
marcados como `kriol`, `kr` ou `source.kriol` usam essa gramática. Para mudar
o realce, altera o kriol-syntax e atualiza a versão em `site/package.json`.

## Abrir no playground

Cada bloco `kriol` com uma função `inisiu` ganha, por baixo, a ligação «Abrir
no playground», que abre o programa no [playground](https://play.kriol.dev) sem
o copiar. O código vai na própria ligação (`#code=...`); o `title` do bloco, se
houver, dá o nome ao ficheiro no editor.

Um programa que não está completo sozinho, por exemplo porque usa uma função
de um bloco anterior, não deve ter a ligação: marca-o com `no-playground`.

````markdown
```kriol no-playground
fn inisiu() {
    mostran(soma(2, 3));
}
```
````

A ligação é criada por `site/src/remark-playground-links.mjs`, testado com
`npm test` dentro de `site/`. Para a apontar para um playground local, define
`KRIOL_PLAYGROUND_URL`, por exemplo
`KRIOL_PLAYGROUND_URL=http://localhost:3000/ npm run dev`.

## Licença

MIT - Vê [LICENSE](../LICENSE) para detalhes
