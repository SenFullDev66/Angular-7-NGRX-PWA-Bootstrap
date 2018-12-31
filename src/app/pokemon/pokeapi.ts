export interface PokeApiResource {
  url: string;
}

export interface PokeApiNamedResource extends PokeApiResource {
  name: string;
}

export interface PokeApiPageable {
  offset?: number;
  limit?: number;
}

export interface PokeApiList<T extends PokeApiResource> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface Pokemon extends PokeApiNamedResource {
  id: number;
}

export interface PokeApiPokemonList extends PokeApiList<PokeApiNamedResource> {}
