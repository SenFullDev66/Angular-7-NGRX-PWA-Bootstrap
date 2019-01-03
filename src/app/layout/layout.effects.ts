import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LayoutActionTypes,
  ChangeTitle,
  TitleChanged,
  PushMessage,
  CloseMessage
} from './layout.actions';
import { map, delayWhen } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable()
export class LayoutEffects {
  constructor(private actions$: Actions) {}

  static delayTime = 5000;

  @Effect()
  onTitleChange = this.actions$.pipe(
    ofType(LayoutActionTypes.ChangeTitle),
    map((action: ChangeTitle) => {
      document.title = `E-PokédeX - ${action.title}`;
      return new TitleChanged(action.title);
    })
  );

  @Effect()
  onPushMessage = this.actions$.pipe(
    ofType(LayoutActionTypes.PushMessage),
    delayWhen(() => interval(LayoutEffects.delayTime)),
    map((action: PushMessage) => new CloseMessage(action.message))
  );
}
