import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PokemonActionTypes, PokemonsLoaded } from './pokemon.actions';
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
    mergeMap(() => this.pokemonService.findAll()),
    map(result => result.results),
    map(pokemons => new PokemonsLoaded(pokemons))
  );
}
