import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PokemonActionTypes, PokemonsLoaded } from './pokemon.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  onLoadPokemons = this.actions$.pipe(
    ofType(PokemonActionTypes.LoadPokemons),
    map(action => new PokemonsLoaded([{ id: '123', name: 'Pikachu' }]))
  );
}
