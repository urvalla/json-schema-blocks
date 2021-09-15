import {bool} from '../main'

test('bool', () => {
    expect(bool()).toStrictEqual({ type: 'boolean' });
});
