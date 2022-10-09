import { deserialize } from './deserialize';

it('should clean empty keys with empty value', function () {
  expect(deserialize({ username: '', password: '' })).toStrictEqual('');
});
