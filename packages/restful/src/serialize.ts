import { ensureIsArray, isTruthy, numeric, pushCondition } from './helpers';
import { Operations, ParsedQueryString, QueryCommand } from './types';

export function serialize(query): ParsedQueryString {
  query = query || '';
  const pairs = query.split('&');
  const parsed: ParsedQueryString = {};
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    switch (key) {
      case QueryCommand.$select:
        ensureIsArray(parsed, key);
        parsed[key].push(...value.split(','));
        break;
      case QueryCommand.$withDeleted:
        parsed[key] = isTruthy(value);
        break;
      case QueryCommand.$page:
      case QueryCommand.$pageSize:
        parsed[key] = numeric(value, Math.floor);
        break;
      case QueryCommand.$sort:
        ensureIsArray(parsed, key);
        parsed[key].push(value);
        break;
      default:
        ensureIsArray(parsed, '$where');
        pushCondition(parsed['$where'], key, value);
      // parsed['$where'].push({ [key]: `${Operations.eq}(${value})` });
    }
  }
  return parsed;
}
