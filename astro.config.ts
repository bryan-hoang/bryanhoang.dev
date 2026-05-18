// @ts-check
import { defineConfig } from "astro/config";
import { createLogger } from "vite-plus";

const logger = createLogger();

// Suppress warnings related to `esbuildOptions` being used by Astro plugins.
// Vite+ uses Rolldown which doesn't support `esbuildOptions`, so these warnings
// are expected but noisy.
const originalWarn = logger.warn.bind(logger);
const originalInfo = logger.info.bind(logger);
const originalConsoleWarn = console.warn.bind(console);

logger.warn = (msg, options) => {
	if (
		msg.includes("optimizeDeps.esbuildOptions") ||
		msg.includes("transformWithEsbuild")
	) {
		return;
	}
	originalWarn(msg, options);
};

logger.info = (msg, options) => {
	if (
		msg.includes("optimizeDeps.esbuildOptions") ||
		msg.includes("transformWithEsbuild")
	) {
		return;
	}
	originalInfo(msg, options);
};

// Some internals (like the deprecation notice for `transformWithEsbuild`) bypass
// the Vite logger entirely and write directly to console/stderr.
// We monkey-patch console.warn to catch those final few noisy notices.
console.warn = (...args) => {
	if (
		typeof args[0] === "string" &&
		(args[0].includes("optimizeDeps.esbuildOptions") ||
			args[0].includes("transformWithEsbuild"))
	) {
		return;
	}
	originalConsoleWarn(...args);
};

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
	site: "https://bryanhoang.dev",
	integrations: [],
	vite: {
		customLogger: logger,
		plugins: [
			{
				// Astro's dev-toolbar plugin injects `esbuildOptions` into Vite's config.
				// Since Vite+ relies on Rolldown instead of esbuild, this causes a "Not implemented"
				// crash during the `generateBundle` phase when it attempts to translate esbuild plugins.
				// We strip the property entirely to ensure the build succeeds.
				name: "remove-esbuild-options",
				// Using `any` here bypasses TypeScript deprecation hints from `@astrojs/check`
				// regarding the `esbuildOptions` property, keeping the `vp run check` output clean.
				config(config: any) {
					if (config.optimizeDeps?.esbuildOptions) {
						delete config.optimizeDeps.esbuildOptions;
					}
				},
			},
		],
	},
});
