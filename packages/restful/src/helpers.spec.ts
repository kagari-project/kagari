import { numeric, getOperatedValue } from './helpers';
import { Operations } from './types';

it('numeric should parse "20"', function () {
  const returns = numeric('20', Math.floor);
  expect(returns).toBe(20);
});

describe('testing getOperatedValue', () => {
  it('should returns empty string if empty array given for $bw', function () {
    const returns = getOperatedValue(Operations.bw, []);
    expect(returns).toStrictEqual('');
  });
});
