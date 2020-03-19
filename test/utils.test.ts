import { omit } from '../src/utils';

describe('Tree Helpers', () => {
  it('list to tree', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['a'])).toStrictEqual({ b: 2, c: 3 });
  });
});
