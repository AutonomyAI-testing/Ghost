import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../apps/admin/src/**/*.mdx", "../apps/admin/src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
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
        global: "globalThis",
      },
      resolve: {
        alias: {
          "@": resolve(__dirname, "../apps/admin/src"),
        },
      },
      optimizeDeps: {
        exclude: ['crypto', 'fs', 'path', 'util', 'assert'],
      },
    });
  }
};

export default config;
