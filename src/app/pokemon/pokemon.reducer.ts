import { Action, createFeatureSelector } from '@ngrx/store';

export interface PokemonState {
  loading: boolean;
  pokemons: any[];
}

export interface PokemonFeatureState {
  pokemon: PokemonState;
}

export const initialState: PokemonState = {
  loading: false,
  pokemons: []
};

export function reducer(state = initialState, action: Action): PokemonState {
  switch (action.type) {
    default:
      return state;
  }
}

export const pokemonSelector = createFeatureSelector<
  PokemonFeatureState,
  PokemonState
>('pokemon');
