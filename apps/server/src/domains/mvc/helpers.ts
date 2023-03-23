import * as path from 'path';

export function getUrl() {
  return (...args: string[]) => args.slice(0, args.length - 1).join('');
}

export function loadThemeAsset() {
  return (rss, prodRss) => {
    return process.env.NODE_ENV === 'production' && prodRss
      ? path.join(`/themes/default/assets`, prodRss)
      : path.join(`/themes/default/assets`, rss);
  };
}
