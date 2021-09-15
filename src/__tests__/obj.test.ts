import {num, obj, str} from '../main';

test('obj(): produces schema for "object" and requires all properties', () => {
  expect(obj({prop1: str(), prop2: num()}))
      .toStrictEqual({
        type: 'object',
        properties: {
          prop1: {type: 'string'},
          prop2: {type: 'number'},
        },
        required: ['prop1', 'prop2']
      });
});

test('obj() with "required" param: produces schema for "object" and requires listed properties', () => {
  expect(obj({prop1: str(), prop2: num()}, {required: ['prop1']}))
      .toStrictEqual({
        type: 'object',
        properties: {
          prop1: {type: 'string'},
          prop2: {type: 'number'},
        },
        required: ['prop1']
      });

  expect(obj({prop1: str(), prop2: num()}, {required: []}))
      .toStrictEqual({
        type: 'object',
        properties: {
          prop1: {type: 'string'},
          prop2: {type: 'number'},
        },
        required: []
      });
});


test('obj() with "optional" param: produces schema for "object" and requires not optional properties', () => {
  expect(obj({prop1: str(), prop2: num()}, {optional: ['prop1']}))
      .toStrictEqual({
        type: 'object',
        properties: {
          prop1: {type: 'string'},
          prop2: {type: 'number'},
        },
        required: ['prop2']
      });

  expect(obj({prop1: str(), prop2: num()}, {optional: []}))
      .toStrictEqual({
        type: 'object',
        properties: {
          prop1: {type: 'string'},
          prop2: {type: 'number'},
        },
        required: ['prop1', 'prop2']
      });
});
