import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LayoutActionTypes, ChangeTitle, TitleChanged } from './layout.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class LayoutEffects {
  constructor(private actions$: Actions) {}

  onTitleChange = this.actions$.pipe(
    ofType(LayoutActionTypes.ChangeTitle),
    map((action: ChangeTitle) => {
      document.title = `E-PokedeX - ${action.title}`;
      return new TitleChanged(action.title);
    })
  );
}
