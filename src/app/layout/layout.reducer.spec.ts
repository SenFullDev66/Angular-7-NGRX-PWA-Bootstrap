import { layoutReducer, initialState } from './layout.reducer';
import { LayoutActionTypes, ChangeTitle } from './layout.actions';

describe('Layout Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = layoutReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe(`an "${LayoutActionTypes.ChangeTitle}" action`, () => {

    it('with "Title A" title payload, should reduce state with "Title A" title', () => {
      const action = new ChangeTitle('Title A');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.title).toBe('Title A');
    });

    it('with "Title B" title payload, should reduce state with "Title B" title', () => {
      const action = new ChangeTitle('Title B');

      const result = layoutReducer(initialState, action);

      expect(result).not.toBe(initialState);
      expect(result.title).toBe('Title B');
    });

  });

});
