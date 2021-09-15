import { id, int } from '../main';

test('int', () => {
  expect(int()).toStrictEqual({ type: 'integer' });
});

test('int with minimum value', () => {
  expect(int(1)).toStrictEqual({ type: 'integer', minimum: 1 });
});

test('int with minimum and maximum value', () => {
  expect(int(1, 10)).toStrictEqual({ type: 'integer', minimum: 1, maximum: 10 });
});

test('int with maximum value', () => {
  expect(int(undefined, 10)).toStrictEqual({ type: 'integer', maximum: 10 });
});

test('id(): shortcut to int(1)', () => {
  expect(id()).toStrictEqual({ type: 'integer', minimum: 1 });
});
