import {
  reducer,
  initialState,
  PokemonFeatureState,
  PokemonState,
  pokemonSelector,
  pokemonListSelector,
  pokemonCountSelector,
  pokemonLoadingSelector,
  pokemonPageableSelector,
  pokemonLoadingFavoritesSelector
} from './pokemon.reducer';
import {
  PokemonActionTypes,
  LoadPokemons,
  PokemonsLoaded,
  LoadFavoritePokemons,
  FavoritePokemonsLoaded
} from './pokemon.actions';
import { Pokemon } from './pokeapi';

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
    const pokemons: Pokemon[] = [
      new Pokemon('bulbasaur', 'https://pokeapi.co/api/v2/pokemon/1/')
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

  describe(`a "${PokemonActionTypes.LoadFavoritePokemons}" action`, () => {
    describe('with initial state, it reduce to a state', () => {
      const action = new LoadFavoritePokemons();
      let state: PokemonState;
      let result: PokemonState;

      beforeEach(() => {
        state = initialState;
        result = reducer(state, action);
      });

      it('different from previous state', () => {
        expect(result).not.toBe(state);
      });

      it('with "favoritesLoaded" = "false"', () => {
        expect(result.favoritesLoaded).toBeFalsy();
      });

      it('with "loadingFavorites" = "true"', () => {
        expect(result.loadingFavorites).toBeTruthy();
      });

      it('with "favoritePokemons" array empty', () => {
        expect(result.favoritePokemons).toBeTruthy();
        expect(result.favoritePokemons.length).toBeFalsy();
      });
    });
  });
  describe(`a "${PokemonActionTypes.FavoritePokemonsLoaded}" action`, () => {
    describe('with a state with "loadingFavorites" = "true", it reduce to a state', () => {
      const pokemons: Pokemon[] = [
        new Pokemon('bulbasaur', 'https://pokeapi.co/api/v2/pokemon/1/'),
        new Pokemon('ivysaur', 'https://pokeapi.co/api/v2/pokemon/2/')
      ];
      const action = new FavoritePokemonsLoaded(pokemons);
      let state: PokemonState;
      let result: PokemonState;

      beforeEach(() => {
        state = { ...initialState, loadingFavorites: true };
        result = reducer(state, action);
      });

      it('different from previous state', () => {
        expect(result).not.toBe(state);
      });

      it('with "favoritesLoaded" = "true"', () => {
        expect(result.favoritesLoaded).toBeTruthy();
      });

      it('with "loadingFavorites" = "false"', () => {
        expect(result.loadingFavorites).toBeFalsy();
      });

      it('with "favoritePokemons" array filled with 2 pokemons', () => {
        expect(result.favoritePokemons).toBeTruthy();
        expect(result.favoritePokemons).toBe(pokemons);
      });
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
      ...initialState,
      pokemons: [
        new Pokemon('bulbasaur', 'https://pokeapi.co/api/v2/pokemon/1/')
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

describe('pokemonPageableSelector', () => {
  it('with initial state it selects pageable with offset 0 and limit 10', () => {
    const pokemonState: PokemonState = initialState;
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonPageableSelector(rootState);
    expect(result).toEqual(initialState.pageable);
  });

  it('with a state with pageable with offset 20 and limit 30, it selects pageable with offset 20 and limit 30', () => {
    const pageable = {
      offset: 20,
      limit: 30
    };
    const pokemonState: PokemonState = {
      ...initialState,
      pageable
    };
    const rootState: PokemonFeatureState = {
      pokemon: pokemonState
    };
    const result = pokemonPageableSelector(rootState);
    expect(result).toEqual(pageable);
  });
});

describe('pokemonLoadingFavoritesSelector', () => {
  it('with initial state, it selects "false"', () => {
    const pokemonState = initialState;
    const rootState = { pokemon: pokemonState };
    const result = pokemonLoadingFavoritesSelector(rootState);
    expect(result).toBe(false);
  });

  it('with state with "loadingFavorites" = "true", it selects "true"', () => {
    const pokemonState = { ...initialState, loadingFavorites: true };
    const rootState = { pokemon: pokemonState };
    const result = pokemonLoadingFavoritesSelector(rootState);
    expect(result).toBe(true);
  });
});
