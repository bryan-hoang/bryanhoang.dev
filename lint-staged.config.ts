import type { Configuration } from 'lint-staged';

const config: Configuration = {
	'*': [
		'biome check --no-errors-on-unmatched --files-ignore-unknown=true --write --unsafe',
	],
};

export default config;
