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
import { Operations } from './types';

function getOperatorBySymbol(symbol, value) {
  switch (symbol) {
    case Operations.eq:
      return Equal(value);
    case Operations.not:
      return Not(value);
    case Operations.bw:
      return Between(value[0], value[1]);
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

export function extractOperators(input = '') {
  const matches = /^(\$.*)\((.*)\)/.exec(input);
  if (!matches) {
    return input;
  }
  const [, symbol, value] = matches;
  return getOperatorBySymbol(symbol, value);
}
