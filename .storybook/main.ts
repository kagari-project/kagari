import { dirname, join } from "path";
import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  stories: [
    '../components/ui/*.mdx',
    "../components/ui/(components|utils)/**/*.mdx",
    "../components/ui/(components|utils)/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
