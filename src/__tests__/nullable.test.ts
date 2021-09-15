import { nullable, obj, str } from '../main';

test('nullable', () => {
  expect(nullable(str())).toStrictEqual({ type: ['string', 'null'] });
});

test('nullable preserves properties', () => {
  expect(nullable(str(1, 10))).toStrictEqual({
    type: ['string', 'null'],
    minLength: 1,
    maxLength: 10,
  });

  expect(nullable(obj({ prop: str() }, { required: ['prop'] }))).toStrictEqual({
    type: ['object', 'null'],
    properties: {
      prop: { type: 'string' },
    },
    required: ['prop'],
  });
});

test('nullable: adds null when multiple types are presented', () => {
  expect(nullable({ type: ['string', 'number'] })).toStrictEqual({ type: ['string', 'number', 'null'] });
});
