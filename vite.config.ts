import { defineConfig } from "vite-plus";

export default defineConfig({
	fmt: {
		printWidth: 80,
		proseWrap: "always",
		useTabs: true,
	},
	lint: { options: { typeAware: true, typeCheck: true } },
	staged: { "*": "vp check --fix && vp run check" },
});
