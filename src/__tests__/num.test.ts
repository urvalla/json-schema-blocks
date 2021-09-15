import { num } from '../main';

test('num', () => {
  expect(num()).toStrictEqual({ type: 'number' });
});

test('num with minimum value', () => {
  expect(num(1)).toStrictEqual({ type: 'number', minimum: 1 });
});

test('num with minimum and maximum value', () => {
  expect(num(1, 10)).toStrictEqual({ type: 'number', minimum: 1, maximum: 10 });
});

test('num with maximum value', () => {
  expect(num(undefined, 10)).toStrictEqual({ type: 'number', maximum: 10 });
  expect(num(null, 10)).toStrictEqual({ type: 'number', maximum: 10 });
});
