import {
  IsNull,
  Not,
  Between,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  ILike,
  Equal,
} from '@kagari/database';
import { Operations, ParsedQueryString } from './types';

function getOperatorBySymbol(symbol, value) {
  switch (symbol) {
    case Operations.eq:
      return Equal(value);
    case Operations.not:
      return Not(value);
    case Operations.bw:
      return Between(value.split(',')[0], value.split(',')[1]);
    case Operations.ilike:
      return ILike(value);
    case Operations.in:
      return In(value);
    case Operations.isnull:
      return IsNull();
    case Operations.lt:
      return LessThan(value);
    case Operations.lte:
      return LessThanOrEqual(value);
    case Operations.gt:
      return MoreThan(value);
    case Operations.gte:
      return MoreThanOrEqual(value);
    default:
      return value;
  }
}

export function extractOperator(input = '') {
  const matches = /^(\$.*)\((.*)\)/.exec(input);
  if (!matches) {
    return input;
  }
  const [, symbol, value] = matches;
  return getOperatorBySymbol(symbol, value);
}

export function extractOperators($where: Array<{ [key: string]: string }>) {
  if (!$where) {
    return undefined;
  }
  return $where.map((conditions) => {
    for (const field in conditions) {
      conditions[field] = extractOperator(conditions[field]);
    }
    return conditions;
  });
}
