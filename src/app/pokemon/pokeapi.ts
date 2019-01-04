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
    this.imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites${path}.png`;
  }

  imageSrc: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokeApiNamedResource;
}

export interface PokemonAbility {
  slot: number;
  is_hidden: boolean;
  ability: PokeApiNamedResource;
}

export interface PokemonType {
  slot: number;
  type: PokeApiNamedResource;
}

export interface PokemonSprites {
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
  front_female: string;
  front_shiny_female: string;
  front_default: string;
  front_shiny: string;
}

export interface PokemonDetail extends PokeApiNamedResource {
  id: number;
  weight: number;
  height: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: PokemonSprites;
}

export interface PokeApiPokemonList extends PokeApiList<PokeApiNamedResource> {}
