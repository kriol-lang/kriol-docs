// Code colours of kriol.dev and the playground, as themes for Expressive Code:
// keywords in the logo's teal, types in purple, built-in functions in blue,
// constants in orange, and texts in green.

function theme(name, type, palette) {
	return {
		name,
		type,
		colors: {
			'editor.background': palette.background,
			'editor.foreground': palette.text,
		},
		tokenColors: [
			{ scope: ['comment'], settings: { foreground: palette.comment, fontStyle: 'italic' } },
			{ scope: ['keyword', 'storage.modifier'], settings: { foreground: palette.keyword, fontStyle: 'bold' } },
			{ scope: ['keyword.operator'], settings: { foreground: palette.muted, fontStyle: '' } },
			{ scope: ['storage.type', 'entity.name.type', 'support.type'], settings: { foreground: palette.type } },
			{ scope: ['support.function', 'entity.name.function'], settings: { foreground: palette.function } },
			{ scope: ['constant', 'constant.numeric', 'constant.language'], settings: { foreground: palette.constant } },
			{ scope: ['string', 'constant.character.escape'], settings: { foreground: palette.string } },
			{ scope: ['meta.interpolation', 'variable'], settings: { foreground: palette.text } },
		],
	};
}

export const kriolLight = theme('kriol-light', 'light', {
	background: '#f3f6f4',
	text: '#12292e',
	muted: '#536a6e',
	comment: '#7b8a8c',
	keyword: '#00708c',
	type: '#7c4dbd',
	function: '#2c5db0',
	constant: '#b35309',
	string: '#2e7d32',
});

export const kriolDark = theme('kriol-dark', 'dark', {
	background: '#0e1012',
	text: '#e9e7e2',
	muted: '#a2a7a8',
	comment: '#7d8587',
	keyword: '#6cc4dc',
	type: '#c3a6f0',
	function: '#8fb8f0',
	constant: '#e8b07a',
	string: '#a6d49a',
});
