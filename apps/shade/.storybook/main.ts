import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: { autodocs: "tag" },
  async viteFinal(config) {
    config.server = config.server || {};
    config.server.allowedHosts = 'all';
    
    // Add crypto polyfill for Node.js builtin modules
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
    };
    
    config.define = {
      ...config.define,
      'global': 'globalThis',
    };
    
    return config;
  }
};

export default config;
