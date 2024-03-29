import { extractOperators, extractOperator } from './extract-operators';
import { Between, Equal, ILike } from '@kagari/database';

it('should extract operator and value', function () {
  expect(extractOperators([{ username: '$eq(root2)' }])).toStrictEqual([
    { username: Equal('root2') },
  ]);
});

it('should give back value if regExp not matches', function () {
  expect(extractOperators([{ username: 'root2' }])).toStrictEqual([
    { username: 'root2' },
  ]);
});

it('should correct handle between', function () {
  expect(extractOperator('$bw(2022-10-04,2022-10-15)')).toStrictEqual(
    Between('2022-10-04', '2022-10-15'),
  );
});

it('should give like', function () {
  expect(extractOperator('$ilike(ffff)')).toStrictEqual(ILike('%ffff%'));
});
