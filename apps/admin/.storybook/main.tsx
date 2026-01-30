import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import { mergeConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions"
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	async viteFinal(config) {
		// Customize Vite config for Storybook
		// We need to override the plugins to exclude Ghost-specific ones
		return mergeConfig(config, {
			plugins: [react(), tsconfigPaths()],
			define: {
				"process.env.DEBUG": false,
			},
			resolve: {
				alias: {
					"@ghost-cards": resolve(__dirname, "../../../ghost/core/core/frontend/src/cards"),
					"mingo": resolve(__dirname, "../../../node_modules/mingo/dist/mingo.js"),
				},
			},
		});
	}
};
export default config;
