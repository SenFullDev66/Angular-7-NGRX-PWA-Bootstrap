import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonActionTypes, PokemonActions } from './pokemon.actions';
import { PokeApiNamedResource, PokeApiPageable } from './pokeapi';

export interface PokemonState {
  loading: boolean;
  pokemons: PokeApiNamedResource[];
}

export interface PokemonFeatureState {
  pokemon: PokemonState;
}

export const initialState: PokemonState = {
  loading: false,
  pokemons: []
};

export function reducer(
  state = initialState,
  action: PokemonActions
): PokemonState {
  switch (action.type) {
    case PokemonActionTypes.LoadPokemons:
      return { ...state, loading: true };
    case PokemonActionTypes.PokemonsLoaded:
      return { ...state, loading: false, pokemons: action.pokemons };
    default:
      return state;
  }
}

export const pokemonSelector = createFeatureSelector<
  PokemonFeatureState,
  PokemonState
>('pokemon');

export const pokemonListSelector = createSelector(
  pokemonSelector,
  state => state.pokemons
);

export const pokemonListCountSelector = createSelector(
  pokemonListSelector,
  pokemons => pokemons.length
);
