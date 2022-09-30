import { numeric } from './helpers';

it('numeric should parse "20"', function () {
  const returns = numeric('20', Math.floor);
  expect(returns).toBe(20);
});
