import {num} from '../main'

test('num', () => {
    expect(num()).toStrictEqual({ type: 'number' });
});
