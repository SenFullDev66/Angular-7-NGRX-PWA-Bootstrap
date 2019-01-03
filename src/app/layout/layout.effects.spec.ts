import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject, ReplaySubject } from 'rxjs';

import { LayoutEffects } from './layout.effects';
import {
  ChangeTitle,
  TitleChanged,
  LayoutActionTypes,
  PushMessage
} from './layout.actions';
import { Message, Severity } from './layout';
import { take } from 'rxjs/operators';

describe('LayoutEffects', () => {
  let actions$: Subject<any>;
  let effects: LayoutEffects;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [LayoutEffects, provideMockActions(() => actions$)]
    });

    actions$ = new ReplaySubject<any>();
    effects = TestBed.get(LayoutEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe(`on "${LayoutActionTypes.PushMessage}" action dispatch`, () => {
    it(`it effects to "${LayoutActionTypes.CloseMessage} action"`, done => {
      LayoutEffects.delayTime = 100;
      const message: Message = { type: Severity.INFO, message: 'Message A' };
      const action = new PushMessage(message);
      actions$.next(action);
      effects.onPushMessage.pipe(take(1)).subscribe(result => {
        try {
          expect(result).toBeTruthy();
          expect(result.type).toBe(LayoutActionTypes.CloseMessage);
          expect(result.message).toBe(message);
          done();
        } catch (e) {
          done.fail();
        }
      });
    });
  });

  describe(`on "${LayoutActionTypes.ChangeTitle}" action dispatch`, () => {
    const title = 'Title A';

    beforeEach(() => {
      actions$.next(new ChangeTitle(title));
    });

    it(`it effects to "${LayoutActionTypes.TitleChanged}" action`, done => {
      effects.onTitleChange.pipe(take(1)).subscribe(result => {
        try {
          expect(result).toEqual(new TitleChanged(title));
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it(`the document title is changed to "E-PokédeX - ${title}"`, done => {
      effects.onTitleChange.pipe(take(1)).subscribe(result => {
        try {
          expect(document.title).toBe(`E-PokédeX - ${title}`);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
});
