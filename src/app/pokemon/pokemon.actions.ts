import { Action } from '@ngrx/store';
import { PokeApiNamedResource } from './pokeapi';

export enum PokemonActionTypes {
  LoadPokemons = '[Pokemon] Load Pokemons',
  PokemonsLoaded = '[Pokemon] Pokemons loaded'
}

export class LoadPokemons implements Action {
  readonly type = PokemonActionTypes.LoadPokemons;
}

export class PokemonsLoaded implements Action {
  readonly type = PokemonActionTypes.PokemonsLoaded;

  constructor(public pokemons: PokeApiNamedResource[]) {}
}

export type PokemonActions = LoadPokemons | PokemonsLoaded;
