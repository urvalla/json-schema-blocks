import { arr, str } from '../main';

test('arr', () => {
  expect(arr(str())).toStrictEqual({ type: 'array', items: { type: 'string' } });
});
