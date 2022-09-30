import { serialize } from './serialize';

it('should parse pagination', function () {
  const parsed = serialize(`$page=1&$pageSize=20`);
  expect(parsed).toStrictEqual({ $page: 1, $pageSize: 20 });
});

it('should parse field key=value', function () {
  const parsed = serialize(`foo=lorem&bar=lorem2`);
  expect(parsed).toStrictEqual({
    $where: [{ foo: '$eq(lorem)' }, { bar: '$eq(lorem2)' }],
  });
});

it('should parse $withDeleted', function () {
  expect(serialize(`$withDeleted=`)).toStrictEqual({ $withDeleted: false });
  expect(serialize(`$withDeleted=0`)).toStrictEqual({ $withDeleted: false });
  expect(serialize(`$withDeleted=1`)).toStrictEqual({ $withDeleted: true });
  expect(serialize(`$withDeleted=false`)).toStrictEqual({
    $withDeleted: false,
  });
  expect(serialize(`$withDeleted=anything`)).toStrictEqual({
    $withDeleted: true,
  });
  expect(serialize(`$withDeleted=true`)).toStrictEqual({ $withDeleted: true });
});
