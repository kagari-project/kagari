import { Serialized } from './types';

function pickValue<Expected>(data: Serialized, key: string) {
  return data[key] as Expected;
}

export function deserialize(data: Serialized): string {
  return Object.keys(data)
    .map((key) => {
      switch (key) {
        case '$select':
          return pickValue<string[]>(data, key).join(',');
        default:
          return `${key}=${data[key]}`;
      }
    })
    .join('&');
}
