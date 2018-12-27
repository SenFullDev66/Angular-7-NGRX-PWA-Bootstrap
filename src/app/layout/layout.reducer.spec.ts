import { layoutReducer, initialState, layoutTitleSelector } from './layout.reducer';
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

describe('layoutTitleSelector', () => {

  it('with initial state it selects "E-PokedeX"', () => {

    const rootState = {
      layout: initialState
    };

    const result = layoutTitleSelector(rootState);

    expect(result).toBe('E-PokedeX');

  });

  it('with a state with "Title B" title it selects "Title B"', () => {
    const title = 'Title B';
    const rootState = {
      layout: {
        title
      }
    };

    const result = layoutTitleSelector(rootState);

    expect(result).toBe(title);
  });

});
