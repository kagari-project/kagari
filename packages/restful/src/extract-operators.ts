import {
  IsNull,
  Not,
  Between,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from '@kagari/database';

export function extractOperators(value = '') {
  const matches = /^\$(.*)\((.*)\)/;
}
