import { arr, str } from '../index';

test('arr', () => {
  expect(arr(str())).toStrictEqual({ type: 'array', items: { type: 'string' } });
});
