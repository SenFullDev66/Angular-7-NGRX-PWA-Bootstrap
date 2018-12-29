import { reducer, initialState } from './pokemon.reducer';
import {
  PokemonActionTypes,
  LoadPokemons,
  PokemonsLoaded
} from './pokemon.actions';
import { Pokemons } from './pokemon';

describe('Pokemon Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe(`a "${PokemonActionTypes.LoadPokemons}" action`, () => {
    it('to a state with loading "true"', () => {
      const action = new LoadPokemons();

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe(`a ${PokemonActionTypes.PokemonsLoaded} action`, () => {
    it('to a state with loading "false" and pokemons array filled', () => {
      const pokemons: Pokemons = [
        {
          id: '123',
          name: 'Pikachu'
        }
      ];
      const action = new PokemonsLoaded(pokemons);

      const result = reducer({ ...initialState, loading: true }, action);

      expect(result).toEqual({ ...initialState, loading: false, pokemons });
    });
  });
});
