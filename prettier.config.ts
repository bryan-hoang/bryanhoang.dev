import type { Config } from 'prettier';

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
} satisfies Config;

export default config;
