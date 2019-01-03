import { Action } from '@ngrx/store';
import { PokeApiPageable, Pokemon } from './pokeapi';

export enum PokemonActionTypes {
  FavoritePokemon = '[Pokemon] Favorite pokemon',
  LoadPokemons = '[Pokemon] Load Pokemons',
  PokemonsLoaded = '[Pokemon] Pokemons loaded',
  LoadFavoritePokemons = '[Pokemon] Load favorite pokemons',
  FavoritePokemonsLoaded = '[Pokemon] Favorite pokemons loaded'
}

export class LoadPokemons implements Action {
  readonly type = PokemonActionTypes.LoadPokemons;

  constructor(public pageable: PokeApiPageable = { offset: 0, limit: 10 }) {}
}

export class PokemonsLoaded implements Action {
  readonly type = PokemonActionTypes.PokemonsLoaded;

  constructor(public pokemons: Pokemon[], public count: number) {}
}

export class LoadFavoritePokemons implements Action {
  readonly type = PokemonActionTypes.LoadFavoritePokemons;
}

export class FavoritePokemonsLoaded implements Action {
  readonly type = PokemonActionTypes.FavoritePokemonsLoaded;

  constructor(public favoritePokemons: Pokemon[]) {}
}

export class FavoritePokemon implements Action {
  readonly type = PokemonActionTypes.FavoritePokemon;

  constructor(public pokemon: Pokemon) {}
}

export type PokemonActions =
  | FavoritePokemon
  | LoadPokemons
  | PokemonsLoaded
  | LoadFavoritePokemons
  | FavoritePokemonsLoaded;
