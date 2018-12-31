import { reducer, initialState } from './pokemon.reducer';
import {
  PokemonActionTypes,
  LoadPokemons,
  PokemonsLoaded
} from './pokemon.actions';
import { PokeApiNamedResource } from './pokeapi';

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
      const pokemons: PokeApiNamedResource[] = [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/'
        }
      ];
      const action = new PokemonsLoaded(pokemons);

      const result = reducer({ ...initialState, loading: true }, action);

      expect(result).toEqual({ ...initialState, loading: false, pokemons });
    });
  });
});
