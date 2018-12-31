import {
  reducer,
  initialState,
  PokemonFeatureState,
  PokemonState,
  pokemonSelector,
  pokemonListSelector,
  pokemonPaginatedListSelector
} from './pokemon.reducer';
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
    const pokemons: PokeApiNamedResource[] = [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/'
      }
    ];

    let result;

    beforeEach(() => {
      const action = new PokemonsLoaded(pokemons);
      result = reducer({ ...initialState, loading: true }, action);
    });

    it('to a state with loading "false"', () => {
      expect(result).toBeTruthy();
      expect(result.loading).toBeFalsy();
    });

    it('to a state with pokemons array filled', () => {
      expect(result).toBeTruthy();
      expect(result.pokemons).toEqual(pokemons);
    });
  });
});

describe('pokemonSelector', () => {
  it('it selects the pokemon feature state', () => {
    const pokemonState: PokemonState = initialState;
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonSelector(rootState);
    expect(result).toEqual(pokemonState);
  });
});

describe('pokemonListSelector', () => {
  it('with initial value, it selects an empty array', () => {
    const pokemonState: PokemonState = initialState;
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonListSelector(rootState);
    expect(result).toEqual(pokemonState.pokemons);
  });

  it('with state with an array of pokemons, it selects the same array', () => {
    const pokemonState = {
      pokemons: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/'
        }
      ],
      loading: false
    };
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonListSelector(rootState);
    expect(result).toEqual(pokemonState.pokemons);
  });
});

describe('pokemonPaginatedListSelector', () => {
  it('with initial value, it selects an empty array', () => {
    const pokemonState: PokemonState = initialState;
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonPaginatedListSelector(rootState, {
      offset: 0,
      limit: 10
    });
    expect(result).toEqual(pokemonState.pokemons);
  });

  describe('with state with an array of 10 pokemons', () => {
    const pokemonState = {
      pokemons: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/'
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/'
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/'
        },
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/'
        },
        {
          name: 'charmeleon',
          url: 'https://pokeapi.co/api/v2/pokemon/5/'
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/'
        },
        {
          name: 'squirtle',
          url: 'https://pokeapi.co/api/v2/pokemon/7/'
        },
        {
          name: 'wartortle',
          url: 'https://pokeapi.co/api/v2/pokemon/8/'
        },
        {
          name: 'blastoise',
          url: 'https://pokeapi.co/api/v2/pokemon/9/'
        },
        {
          name: 'caterpie',
          url: 'https://pokeapi.co/api/v2/pokemon/10/'
        }
      ],
      loading: false
    };
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };

    it('and with offset 3 and limit 3, it selects 3 pokemons starting of "charmander"', () => {
      const result = pokemonPaginatedListSelector(rootState, {
        offset: 3,
        limit: 3
      });
      expect(result).toBeTruthy();
      expect(result.length).toBe(3);
      expect(result).toEqual([
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/'
        },
        {
          name: 'charmeleon',
          url: 'https://pokeapi.co/api/v2/pokemon/5/'
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/'
        }
      ]);
    });
  });
});
