import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LayoutActionTypes, ChangeTitle, TitleChanged } from './layout.actions';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class LayoutEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  onTitleChange = this.actions$.pipe(
    ofType(LayoutActionTypes.ChangeTitle),
    map((action: ChangeTitle) => {
      document.title = `E-PokédeX - ${action.title}`;
      return new TitleChanged(action.title);
    })
  );
}
