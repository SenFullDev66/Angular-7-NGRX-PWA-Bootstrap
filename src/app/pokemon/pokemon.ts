export interface Pokemon {
  id: string;
  name: string;
}

export interface PokeApiList<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface PokeApiPageable {
  offset?: number;
  limit?: number;
}

export interface PokeApiPokemonList extends PokeApiList<Pokemon> {}

export type Pokemons = Pokemon[];
