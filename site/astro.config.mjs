// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const kriolGrammar = JSON.parse(
  readFileSync(fileURLToPath(new URL('./src/kriol.tmLanguage.json', import.meta.url)), 'utf-8')
);

// https://astro.build/config
export default defineConfig({
	site: 'https://kriol-lang.github.io',
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
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/kriol-lang' },
			],
			editLink: {
				baseUrl: 'https://github.com/kriol-lang/kriol-docs/edit/main/site/',
			},
			customCss: ['./src/styles/custom.css'],
			expressiveCode: {
				langs: [kriolGrammar],
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
						{ label: 'Arrays', slug: 'linguagem/arrays' },
						{ label: 'Strings e Interpolação', slug: 'linguagem/strings' },
						{ label: 'Estruturas (molda) - Em Desenvolvimento', slug: 'linguagem/estruturas' },
						{ label: 'Entrada de Dados - Em Desenvolvimento', slug: 'linguagem/entrada' },
						{ label: 'Conversão de Tipos - Em Desenvolvimento', slug: 'linguagem/conversao-de-tipos' },
					],
				},
				{
					label: 'Referência',
					items: [
						{ label: 'Vocabulário', slug: 'referencia/vocabulario' },
						{ label: 'Especificação Formal', slug: 'referencia/especificacao' },
					],
				},
			],
		}),
	],
});
