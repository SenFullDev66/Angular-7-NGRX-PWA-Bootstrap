import { Action } from '@ngrx/store';

export enum PokemonActionTypes {
  LoadPokemons = '[Pokemon] Load Pokemons'
}

export class LoadPokemons implements Action {
  readonly type = PokemonActionTypes.LoadPokemons;
}

export type PokemonActions = LoadPokemons;
