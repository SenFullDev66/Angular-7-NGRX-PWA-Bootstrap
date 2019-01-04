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

export class Pokemon implements PokeApiNamedResource {
  constructor(
    public name: string,
    public url: string,
    public favorite = false
  ) {
    const [host, path] = this.url.replace(/\/$/, '').split('/api/v2');
    this.imageSrc = `/PokeAPI/sprites/master/sprites${path}.png`;
  }

  imageSrc: string;
}

export interface PokeApiPokemonList extends PokeApiList<PokeApiNamedResource> {}
