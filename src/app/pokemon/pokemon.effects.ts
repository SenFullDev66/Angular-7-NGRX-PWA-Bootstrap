import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  PokemonActionTypes,
  PokemonsLoaded,
  LoadPokemons,
  FavoritePokemonsLoaded,
  FavoritePokemon,
  UnfavoritePokemon
} from './pokemon.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokeapi';
import { PushMessage } from '../layout/layout.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  @Effect()
  onLoadPokemons = this.actions$.pipe(
    ofType(PokemonActionTypes.LoadPokemons),
    mergeMap((action: LoadPokemons) =>
      this.pokemonService.findAll(action.pageable)
    ),
    map(({ results, ...rest }) => ({
      ...rest,
      results: results.map(({ name, url }) => new Pokemon(name, url))
    })),
    map(({ results, count }) => new PokemonsLoaded(results, count)),
    catchError((error: HttpErrorResponse) =>
      of(PushMessage.danger(error.statusText))
    )
  );

  @Effect()
  onLoadFavoritePokemons = this.actions$.pipe(
    ofType(PokemonActionTypes.LoadFavoritePokemons),
    mergeMap(() => this.pokemonService.restoreFavorites()),
    map(favoritePokemons => new FavoritePokemonsLoaded(favoritePokemons))
  );

  @Effect()
  onFavoritePokemon = this.actions$.pipe(
    ofType(PokemonActionTypes.FavoritePokemon),
    map(({ pokemon }: FavoritePokemon) => {
      this.pokemonService.storeFavorites([pokemon]);
      return PushMessage.success(`Pokemon "${pokemon.name}" favorited`);
    })
  );

  @Effect()
  onUnfavoritePokemon = this.actions$.pipe(
    ofType(PokemonActionTypes.UnfavoritePokemon),
    map(({ pokemon }: UnfavoritePokemon) => {
      this.pokemonService.removeFromFavorites(pokemon);
      return PushMessage.success(
        `Pokemon "${pokemon.name}" removed from favorites`
      );
    })
  );
}
