import { deserialize } from './deserialize';

it('should clean empty keys with empty value', function () {
  expect(deserialize({ username: '', password: '' })).toStrictEqual('');
});

it('should support select', function () {
  expect(deserialize({ $select: ['foobar', 'foo.bar'] })).toStrictEqual(
    '$select=foobar,foo.bar',
  );
});

it('should supports relation query', function () {
  expect(deserialize({ $relations: ['order', 'order.user'] })).toStrictEqual(
    `$relations=order,order.user`,
  );
});
