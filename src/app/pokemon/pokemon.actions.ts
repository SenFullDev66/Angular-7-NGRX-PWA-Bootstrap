import { Action } from '@ngrx/store';
import { PokeApiNamedResource, PokeApiPageable, Pokemon } from './pokeapi';

export enum PokemonActionTypes {
  LoadPokemons = '[Pokemon] Load Pokemons',
  PokemonsLoaded = '[Pokemon] Pokemons loaded'
}

export class LoadPokemons implements Action {
  readonly type = PokemonActionTypes.LoadPokemons;

  constructor(public pageable: PokeApiPageable = { offset: 0, limit: 10 }) {}
}

export class PokemonsLoaded implements Action {
  readonly type = PokemonActionTypes.PokemonsLoaded;

  constructor(public pokemons: Pokemon[], public count: number) {}
}

export type PokemonActions = LoadPokemons | PokemonsLoaded;
