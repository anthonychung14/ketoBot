import expect from 'expect';
import { staples, initialState } from '../../src/reducers/staple_reducer';

describe('Staple reducer:', () => {
  it('should return the initial state', () => {
    expect(
      staples(initialState, {})
    ).toEqual(initialState);
  });

});
