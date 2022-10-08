import { ensureIsArray, isTruthy, numeric } from './helpers';
import { Operations, ParsedQueryString } from './types';

export function serialize(query): ParsedQueryString {
  query = query || '';
  const pairs = query.split('&');
  const parsed: ParsedQueryString = {};
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    switch (key) {
      case '$select':
        ensureIsArray(parsed, key);
        parsed[key].push(...value.split(','));
        break;
      case '$withDeleted':
        parsed[key] = isTruthy(value);
        break;
      case '$page':
      case '$pageSize':
        parsed[key] = numeric(value, Math.floor);
        break;
      case '$filters':
      case '$where':
      case '$sort':
        ensureIsArray(parsed, key);
        parsed[key].push(value);
        break;
      // all other fields equal filter
      default:
        ensureIsArray(parsed, '$where');
        parsed['$where'].push({ [key]: `${Operations.eq}(${value})` });
    }
  }
  return parsed;
}
