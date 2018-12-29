import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';


@Injectable()
export class PokemonEffects {

  constructor(private actions$: Actions) {}
}
