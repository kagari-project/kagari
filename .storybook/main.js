module.exports = {
  stories: ['../components/ui/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  docsPage: {
    docs: 'automatic',
  },
  core: {
    builder: 'webpack5',
  },
};
