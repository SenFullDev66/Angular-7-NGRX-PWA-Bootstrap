import {
  reducer,
  initialState,
  PokemonFeatureState,
  PokemonState,
  pokemonSelector,
  pokemonListSelector,
  pokemonCountSelector,
  pokemonLoadingSelector
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
      const action = new PokemonsLoaded(pokemons, pokemons.length);
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
      loading: false,
      count: 1
    };
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonListSelector(rootState);
    expect(result).toEqual(pokemonState.pokemons);
  });
});

describe('pokemonCountSelector', () => {
  it('with initial state it selects zero', () => {
    const pokemonState: PokemonState = initialState;
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonCountSelector(rootState);
    expect(result).toBe(initialState.count);
  });

  it('with a state with count "500" it selects 500', () => {
    const count = 500;
    const pokemonState: PokemonState = {
      ...initialState,
      count
    };
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonCountSelector(rootState);
    expect(result).toBe(count);
  });
});

describe('pokemonLoadingSelector', () => {
  it('with initial state it selects "true"', () => {
    const pokemonState: PokemonState = initialState;
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonLoadingSelector(rootState);
    expect(result).toBeTruthy();
  });

  it('with a state that loading is false, it selects "false"', () => {
    const pokemonState: PokemonState = {
      ...initialState,
      loading: false
    };
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonLoadingSelector(rootState);
    expect(result).toBeFalsy();
  });
});
