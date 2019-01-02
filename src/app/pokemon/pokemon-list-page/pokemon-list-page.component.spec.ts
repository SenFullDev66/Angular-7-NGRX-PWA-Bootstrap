import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListPageComponent } from './pokemon-list-page.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import {
  pokemonModuleImports,
  pokemonModuleProviders
} from '../pokemon.module';
import { StoreModule, Action } from '@ngrx/store';
import { EffectsModule, Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonServiceStub } from '../pokemon.service.spec';
import { take, filter, map, mergeMap, mergeMapTo } from 'rxjs/operators';
import { PokemonEffects } from '../pokemon.effects';
import { PokemonService } from '../pokemon.service';
import { Injectable } from '@angular/core';
import { ReplaySubject, of, from, BehaviorSubject } from 'rxjs';
import { PokemonActionTypes } from '../pokemon.actions';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonListPageComponent', () => {
  let component: PokemonListPageComponent;
  let fixture: ComponentFixture<PokemonListPageComponent>;
  let service: PokemonService;
  let stub: PokemonServiceStub;
  let effects: ReplayableEffects;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([ReplayableEffects]),
        HttpClientTestingModule,
        RouterTestingModule,
        NgbPaginationModule,
        LayoutModule,
        ...pokemonModuleImports
      ],
      providers: [
        ...pokemonModuleProviders,
        PokemonServiceStub,
        ReplayableEffects
      ],
      declarations: [PokemonListComponent, PokemonListPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stub = TestBed.get(PokemonServiceStub);
    service = TestBed.get(PokemonService);
    effects = TestBed.get(ReplayableEffects);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the limit$ observable is 10', done => {
    component.limit$.pipe(take(1)).subscribe(limit => {
      try {
        expect(limit).toBe(10);
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });

  it('the page$ observable is 1', done => {
    component.page$.pipe(take(1)).subscribe(page => {
      try {
        expect(page).toBe(1);
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });

  it('the getPageable() observable has offset 0 and limit 10', done => {
    component.pageable$.pipe(take(1)).subscribe(pageable => {
      try {
        expect(pageable).toBeTruthy();
        expect(pageable.offset).toBe(0);
        expect(pageable.limit).toBe(10);
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });

  describe('the loading$ observable', () => {
    it('while PokemonService.findAll request is not resolved, the loading$ observable is true', done => {
      component.loading$.pipe(take(1)).subscribe(loading => {
        try {
          expect(loading).toBeTruthy();
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it('when PokemonService.findAll request is resolved, the loading$ observable is false', done => {
      const mock = stub.findAll();
      spyOn(service, 'findAll').and.returnValue(
        of({
          count: 1,
          result: mock.result
        })
      );

      effects.history$
        .pipe(
          ofType(PokemonActionTypes.PokemonsLoaded),
          take(1),
          mergeMapTo(component.loading$)
        )
        .subscribe(loading => {
          try {
            expect(loading).toBeFalsy();
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });

  describe('setPage function', () => {
    describe('when set page to 2', () => {
      beforeEach(async(() => {
        component.setPage(2);
      }));

      it('the limit$ observable keeps 10', done => {
        component.limit$.pipe(take(1)).subscribe(limit => {
          try {
            expect(limit).toBe(10);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
      });

      it('the page$ observable changes to 2', done => {
        component.page$.pipe(take(1)).subscribe(page => {
          try {
            expect(page).toBe(2);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
      });

      it('the getPageable() observable changes to offset 10 and limit 10', done => {
        component.pageable$.pipe(take(1)).subscribe(pageable => {
          try {
            expect(pageable).toBeTruthy();
            expect(pageable.offset).toBe(10);
            expect(pageable.limit).toBe(10);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
      });
    });
  });
});

@Injectable()
class ReplayableEffects {
  constructor(private actions$: Actions) {}

  history$ = new BehaviorSubject<Action>({ type: 'NONE' });

  @Effect()
  effects$ = this.actions$.pipe(
    filter(({ type }) => type !== 'NONE'),
    map(action => {
      this.history$.next(action);
      return { type: 'NONE' };
    })
  );
}
