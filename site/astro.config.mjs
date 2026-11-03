// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { kriolDark, kriolLight } from './src/kriol-themes.mjs';
import remarkPlaygroundLinks, { PLAYGROUND_URL } from './src/remark-playground-links.mjs';

// The grammar comes from kriol-syntax, the single source of the language syntax.
const kriolGrammar = JSON.parse(
  readFileSync(createRequire(import.meta.url).resolve('kriol-syntax/kriol.tmLanguage.json'), 'utf-8')
);
kriolGrammar.aliases = ['kr', 'source.kriol'];

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.kriol.dev',
	markdown: {
		// KRIOL_PLAYGROUND_URL points the links at another playground, such as a local one.
		remarkPlugins: [[remarkPlaygroundLinks, { base: process.env.KRIOL_PLAYGROUND_URL ?? PLAYGROUND_URL }]],
	},
	integrations: [
		starlight({
			title: 'Kriol',
			description: 'Documentação oficial da linguagem de programação KriolLang.',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Português',
					lang: 'pt-PT',
				},
			},
			logo: {
				alt: 'KriolLang',
				src: './src/assets/logo.svg',
			},
			social: [
				{ icon: 'seti:video', label: 'Playground', href: 'https://play.kriol.dev' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/kriol-lang' },
			],
			editLink: {
				baseUrl: 'https://github.com/kriol-lang/kriol-docs/edit/main/site/',
			},
			customCss: ['./src/styles/custom.css'],
			components: {
				SocialIcons: './src/components/SocialIcons.astro',
			},
			expressiveCode: {
				themes: [kriolDark, kriolLight],
				shiki: {
					langs: [kriolGrammar],
				},
			},
			sidebar: [
				{
					label: 'Introdução',
					items: [
						{ label: 'Sobre o Kriol', slug: 'introducao/sobre' },
						{ label: 'Primeiros Passos', slug: 'introducao/primeiros-passos' },
					],
				},
				{
					label: 'A Linguagem',
					items: [
						{ label: 'Tipos de Dados', slug: 'linguagem/tipos' },
						{ label: 'Variáveis', slug: 'linguagem/variaveis' },
						{ label: 'Operadores', slug: 'linguagem/operadores' },
						{ label: 'Controlo de Fluxo', slug: 'linguagem/controlo-de-fluxo' },
						{ label: 'Funções', slug: 'linguagem/funcoes' },
						{ label: 'Strings e Interpolação', slug: 'linguagem/strings' },
						{ label: 'Entrada de Dados', slug: 'linguagem/entrada' },
						{ label: 'Arrays', slug: 'linguagem/arrays' },
						{ label: 'Moldes (molda)', slug: 'linguagem/estruturas' },
					],
				},
				{
					label: 'Mais a fundo',
					items: [
						{ label: 'Conversão de Tipos', slug: 'linguagem/conversao-de-tipos' },
						{ label: 'Erros', slug: 'linguagem/erros' },
					],
				},
				{
					label: 'Referência',
					items: [
						{ label: 'Vocabulário', slug: 'referencia/vocabulario' },
						{ label: 'Especificação Formal', slug: 'referencia/especificacao' },
						{ label: 'Compilador', slug: 'referencia/compilador' },
					],
				},
			],
		}),
	],
});
