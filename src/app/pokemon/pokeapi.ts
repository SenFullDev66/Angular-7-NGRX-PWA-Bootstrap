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
  constructor(public name: string, public url: string) {}

  get imageSrc() {
    const [host, path] = this.url.split('/api/v2');
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites${path.replace(
      /\/$/,
      ''
    )}.png`;
  }
}

export interface PokeApiPokemonList extends PokeApiList<PokeApiNamedResource> {}
