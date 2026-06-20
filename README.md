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

O site mantém a sua própria gramática Shiki em `site/src/kriol.tmLanguage.json`
para o Expressive Code/Starlight. Blocos Markdown marcados como `kriol`, `kr`
ou `source.kriol` usam essa gramática local.

## Licença

MIT - Vê [LICENSE](../LICENSE) para detalhes
