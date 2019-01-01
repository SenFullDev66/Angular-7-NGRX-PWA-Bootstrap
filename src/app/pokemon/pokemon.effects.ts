import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  PokemonActionTypes,
  PokemonsLoaded,
  LoadPokemons
} from './pokemon.actions';
import { map, mergeMap } from 'rxjs/operators';
import { PokemonService } from './pokemon.service';

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
    map(({ results, count }) => new PokemonsLoaded(results, count))
  );
}
