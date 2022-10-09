/* eslint-disable @typescript-eslint/no-explicit-any */
import { Operations, ParsedQueryString } from './types';

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
  key: keyof Pick<ParsedQueryString, '$where' | '$select'>,
) {
  if (!Array.isArray(obj[key])) {
    obj[key] = [];
  }
}

export function hasOperator(input = '') {
  return /^(\$.*)\((.*)\)/.test(input);
}

export function composeOperator(symbol, value) {
  return typeof value === 'string' && hasOperator(value)
    ? value
    : `${Operations.eq}(${value})`;
}

export function pushCondition<T = any>(
  $where: unknown[],
  key: string,
  value: T,
) {
  if (!key) {
    return;
  }
  if ($where.length === 0) {
    $where.push({
      [key]: composeOperator(Operations.eq, value),
    });
  } else {
    for (const item of $where) {
      if (!item[key]) {
        item[key] = composeOperator(Operations.eq, value);
      }
    }
  }
}

export function pushOrder(
  $order: Record<string, 'ASC' | 'DESC'>,
  value: string,
) {
  const [field, order] = value.split('|');
  $order[field] = order.toUpperCase() as 'ASC' | 'DESC';
}

export function getOperatedValue(
  operator: string,
  value: string | number | string[] | undefined,
) {
  switch (operator) {
    case Operations.eq:
      return `${Operations.eq}(${value})`;
    case Operations.gt:
      return `${Operations.gt}(${value})`;
    case Operations.bw:
      value = (value as string[]).filter((x) => x);
      if (value.length === 0) {
        return '';
      }
      return `${Operations.bw}(${value})`;
    default:
      return value;
  }
}
