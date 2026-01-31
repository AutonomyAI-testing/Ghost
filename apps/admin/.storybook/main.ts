import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  docs: { autodocs: "tag" },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [react()],
      server: {
        allowedHosts: 'all',
      },
      define: {
        "process.env.DEBUG": false,
      },
      resolve: {
        alias: {
          "@": resolve(__dirname, "../src"),
        },
      },
    });
  }
};

export default config;
