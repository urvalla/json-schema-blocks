import { str } from '../main';

test('str', () => {
  expect(str()).toStrictEqual({ type: 'string' });
});

test('str with minLength', () => {
  expect(str(1)).toStrictEqual({ type: 'string', minLength: 1 });
  expect(str({ minLength: 1 })).toStrictEqual({ type: 'string', minLength: 1 });
});

test('str with minLength & maxLength', () => {
  expect(str(1, 10)).toStrictEqual({ type: 'string', minLength: 1, maxLength: 10 });
  expect(str({ minLength: 1, maxLength: 10 })).toStrictEqual({ type: 'string', minLength: 1, maxLength: 10 });
});

test('str with maxLength', () => {
  expect(str(0, 10)).toStrictEqual({ type: 'string', minLength: 0, maxLength: 10 });
  expect(str({ maxLength: 10 })).toStrictEqual({ type: 'string', maxLength: 10 });
});
