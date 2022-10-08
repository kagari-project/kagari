import { ParsedQueryString } from './types';

export function isTruthy(value: number | string | undefined | null) {
  if (typeof value === 'number') {
    return !!value;
  }
  if (typeof value === 'string') {
    return !['', '0', 'false'].includes(value);
  }
  return false;
}

export function numeric(
  value: string | number | undefined | null,
  transform?: (x: number) => number,
) {
  if (typeof value === 'string') {
    value = Number(value);
    if (typeof transform === 'function') {
      value = transform(value);
    }
  }
  if (isNaN(value)) {
    return 0;
  }
  return value;
}

export function ensureIsArray(
  obj: ParsedQueryString,
  key: keyof Pick<
    ParsedQueryString,
    '$filters' | '$where' | '$sort' | '$select'
  >,
) {
  if (!Array.isArray(obj[key])) {
    obj[key] = [];
  }
}
