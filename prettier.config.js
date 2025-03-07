/** @type {import('prettier').Config} */
const config = {
	proseWrap: 'always',
	useTabs: true,
	singleQuote: true,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};

export default config;
