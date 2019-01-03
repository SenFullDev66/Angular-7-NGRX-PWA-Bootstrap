import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonActionTypes, PokemonActions } from './pokemon.actions';
import { PokeApiPageable, Pokemon } from './pokeapi';

export interface PokemonState {
  loading: boolean;
  pageable: PokeApiPageable;
  pokemons: Pokemon[];
  count: number;

  loadedFavorites: boolean;
  loadingFavorites: boolean;
  favoritePokemons: Pokemon[];
}

export interface PokemonFeatureState {
  pokemon: PokemonState;
}

export const initialState: PokemonState = {
  loading: true,
  pageable: {
    offset: 0,
    limit: 10
  },
  pokemons: [],
  count: 0,

  loadedFavorites: false,
  loadingFavorites: false,
  favoritePokemons: []
};

export function reducer(
  state = initialState,
  action: PokemonActions
): PokemonState {
  switch (action.type) {
    case PokemonActionTypes.LoadPokemons:
      return { ...state, pageable: { ...action.pageable }, loading: true };
    case PokemonActionTypes.PokemonsLoaded:
      return {
        ...state,
        loading: false,
        pokemons: action.pokemons,
        count: action.count
      };
    case PokemonActionTypes.LoadFavoritePokemons:
      return {
        ...state,
        loadingFavorites: true
      };
    case PokemonActionTypes.FavoritePokemonsLoaded:
      return {
        ...state,
        favoritePokemons: action.favoritePokemons,
        loadedFavorites: true,
        loadingFavorites: false
      };
    default:
      return state;
  }
}

export const pokemonSelector = createFeatureSelector<
  PokemonFeatureState,
  PokemonState
>('pokemon');

export const pokemonLoadingSelector = createSelector(
  pokemonSelector,
  state => state.loading
);

export const pokemonListSelector = createSelector(
  pokemonSelector,
  state => state.pokemons
);

export const pokemonCountSelector = createSelector(
  pokemonSelector,
  state => state.count
);

export const pokemonPageableSelector = createSelector(
  pokemonSelector,
  state => state.pageable
);
