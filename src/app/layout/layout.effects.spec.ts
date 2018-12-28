import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject, ReplaySubject } from 'rxjs';

import { LayoutEffects } from './layout.effects';
import { ChangeTitle, TitleChanged, LayoutActionTypes } from './layout.actions';

describe('LayoutEffects', () => {
  const actions$: Subject<any> = new ReplaySubject<any>();
  let effects: LayoutEffects;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [LayoutEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(LayoutEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe(`on "${LayoutActionTypes.ChangeTitle}" action dispatch`, () => {
    const title = 'Title A';

    beforeEach(() => {
      actions$.next(new ChangeTitle(title));
    });

    it(`it effects to "${LayoutActionTypes.TitleChanged}" action`, done => {
      effects.onTitleChange.subscribe(result => {
        try {
          expect(result).toEqual(new TitleChanged(title));
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it(`the document title is changed to "E-PokedeX - ${title}"`, done => {
      effects.onTitleChange.subscribe(result => {
        try {
          expect(document.title).toBe(`E-PokedeX - ${title}`);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
});
