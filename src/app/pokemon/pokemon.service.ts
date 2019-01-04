import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PokeApiPokemonList,
  PokeApiPageable,
  Pokemon,
  PokemonDetail
} from './pokeapi';
import { Observable, of } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  static FAVORITE_POKEMONS_KEY = 'ng.app.epokedex.favoritePokemons';

  findAll(
    pageable: PokeApiPageable = { offset: 0, limit: 10 }
  ): Observable<PokeApiPokemonList> {
    const { offset = 0, limit = 10 } = pageable;
    return this.http.get<PokeApiPokemonList>(
      `/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );
  }

  findOne(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`/api/v2/pokemon/${name}`);
  }

  restoreFavorites(): Observable<Pokemon[]> {
    return of(
      window.localStorage.getItem(PokemonService.FAVORITE_POKEMONS_KEY)
    ).pipe(map(str => (str ? JSON.parse(str) : [])));
  }

  storeFavorites(pokemons: Pokemon[]) {
    this.restoreFavorites()
      .pipe(take(1))
      .subscribe(favoritePokemons => {
        window.localStorage.setItem(
          PokemonService.FAVORITE_POKEMONS_KEY,
          JSON.stringify([...pokemons, ...favoritePokemons])
        );
      });
  }

  removeFromFavorites(pokemon: Pokemon) {
    this.restoreFavorites()
      .pipe(
        take(1),
        filter(favoritePokemons => !!favoritePokemons.length)
      )
      .subscribe(favoritePokemons => {
        window.localStorage.setItem(
          PokemonService.FAVORITE_POKEMONS_KEY,
          JSON.stringify(
            favoritePokemons.filter(favorite => favorite.url !== pokemon.url)
          )
        );
      });
  }
}
