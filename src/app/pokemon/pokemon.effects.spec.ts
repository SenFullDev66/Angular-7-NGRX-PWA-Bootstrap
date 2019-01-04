import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import { PokemonEffects } from './pokemon.effects';
import {
  PokemonActions,
  PokemonActionTypes,
  LoadPokemons,
  PokemonsLoaded,
  LoadFavoritePokemons,
  FavoritePokemon,
  UnfavoritePokemon
} from './pokemon.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonServiceStub, POKEMONS_MOCK } from './pokemon.service.spec';
import { PokeApiPageable, Pokemon } from './pokeapi';
import { pokemonModuleProviders } from './pokemon.module';
import { LayoutActionTypes, PushMessage } from '../layout/layout.actions';
import { Severity } from '../layout/layout';
import { PokemonService } from './pokemon.service';
import { take } from 'rxjs/operators';

describe('PokemonEffects', () => {
  let actions$: Subject<PokemonActions>;
  let effects: PokemonEffects;
  let stub: PokemonServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ...pokemonModuleProviders,
        PokemonServiceStub,
        PokemonEffects,
        provideMockActions(() => actions$)
      ]
    });
    actions$ = new ReplaySubject();
    effects = TestBed.get(PokemonEffects);
    stub = TestBed.get(PokemonServiceStub);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe(`on "${PokemonActionTypes.LoadPokemons}" action`, () => {
    it(`when the service is unavailable, it effects to "${
      LayoutActionTypes.PushMessage
    }" action`, done => {
      const mock = stub.serviceUnavailable();
      const action = new LoadPokemons();

      actions$.next(action);

      effects.onLoadPokemons.pipe(take(1)).subscribe((effect: PushMessage) => {
        try {
          expect(effect).toBeTruthy();
          expect(effect.type).toEqual(LayoutActionTypes.PushMessage);
          expect(effect.message.type).toBe(Severity.DANGER);
          expect(effect.message.message).toBe('Service unavailable');
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      mock.stub();
    });

    it(`without pageable it effects to ${
      PokemonActionTypes.PokemonsLoaded
    } action with pokemons list filled`, done => {
      const mock = stub.findAll();
      const { results } = mock.result;

      const action = new LoadPokemons();

      actions$.next(action);

      effects.onLoadPokemons
        .pipe(take(1))
        .subscribe((effect: PokemonsLoaded) => {
          try {
            expect(effect).toBeTruthy();
            expect(effect.type).toEqual(PokemonActionTypes.PokemonsLoaded);
            expect(effect.pokemons).toEqual(results);
            expect(effect.count).toEqual(1);
            done();
          } catch (e) {
            done.fail(e);
          }
        });

      mock.stub();
    });

    it(`with pageable it effects to ${
      PokemonActionTypes.PokemonsLoaded
    } action with pokemons list filled`, done => {
      const pageable: PokeApiPageable = { offset: 20, limit: 50 };
      const mock = stub.findAll(pageable);
      const { results } = mock.result;

      const action = new LoadPokemons(pageable);

      actions$.next(action);

      effects.onLoadPokemons
        .pipe(take(1))
        .subscribe((effect: PokemonsLoaded) => {
          try {
            expect(effect).toBeTruthy();
            expect(effect.type).toEqual(PokemonActionTypes.PokemonsLoaded);
            expect(effect.pokemons).toEqual(results);
            expect(effect.count).toEqual(1);
            done();
          } catch (e) {
            done.fail(e);
          }
        });

      mock.stub();
    });
  });

  describe(`on "${PokemonActionTypes.LoadFavoritePokemons}" action`, () => {
    beforeEach(() => {
      window.localStorage.removeItem(PokemonService.FAVORITE_POKEMONS_KEY);
    });

    it(`when the localStorage entry does not exists, it effects to "${
      PokemonActionTypes.FavoritePokemonsLoaded
    }" action with a empty array`, done => {
      const action = new LoadFavoritePokemons();
      actions$.next(action);
      effects.onLoadFavoritePokemons.pipe(take(1)).subscribe(effect => {
        try {
          expect(effect).toBeTruthy();
          expect(effect.type).toBe(PokemonActionTypes.FavoritePokemonsLoaded);
          expect(effect.favoritePokemons).toEqual([]);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });

    it(`when the localStorage entry exists, it effects to "${
      PokemonActionTypes.FavoritePokemonsLoaded
    }" action with a array of favorite pokemons`, done => {
      window.localStorage.setItem(
        PokemonService.FAVORITE_POKEMONS_KEY,
        JSON.stringify(POKEMONS_MOCK)
      );
      const action = new LoadFavoritePokemons();
      actions$.next(action);
      effects.onLoadFavoritePokemons.pipe(take(1)).subscribe(effect => {
        try {
          expect(effect).toBeTruthy();
          expect(effect.type).toBe(PokemonActionTypes.FavoritePokemonsLoaded);
          expect(effect.favoritePokemons).toBeTruthy();
          expect(effect.favoritePokemons.length).toBe(50);
          expect(effect.favoritePokemons[0].name).toBe('bulbasaur');
          expect(effect.favoritePokemons[49].name).toBe('diglett');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });

  describe(`on "${PokemonActionTypes.FavoritePokemon}" action`, () => {
    let pokemon: Pokemon;

    beforeEach(() => {
      window.localStorage.removeItem(PokemonService.FAVORITE_POKEMONS_KEY);
      pokemon = new Pokemon(
        'bulbasaur',
        'http://pokeapi.salestock.net/api/v2/pokemon/1/'
      );
      actions$.next(new FavoritePokemon(pokemon));
    });

    it('it add favorite pokemons to localStorage', done => {
      effects.onFavoritePokemon
        .pipe(take(1))
        .subscribe((effect: PushMessage) => {
          try {
            const favoritePokemons = window.localStorage.getItem(
              PokemonService.FAVORITE_POKEMONS_KEY
            );
            expect(favoritePokemons).toBeTruthy();
            expect(favoritePokemons).toBe(JSON.stringify([pokemon]));
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    describe('it effects to an action', () => {
      it(`with "${LayoutActionTypes.PushMessage}" type`, done => {
        effects.onFavoritePokemon
          .pipe(take(1))
          .subscribe((effect: PushMessage) => {
            try {
              expect(effect).toBeTruthy();
              expect(effect.type).toBe(LayoutActionTypes.PushMessage);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it(`with a success type message: Pokemon "bulbasaur" favorited`, done => {
        effects.onFavoritePokemon
          .pipe(take(1))
          .subscribe((effect: PushMessage) => {
            try {
              expect(effect).toBeTruthy();
              expect(effect.message.type).toBe(Severity.SUCCESS);
              expect(effect.message.message).toBe(
                'Pokemon "bulbasaur" favorited'
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });
  });

  describe(`on "${PokemonActionTypes.UnfavoritePokemon}" action`, () => {
    let pokemon: Pokemon;

    beforeEach(() => {
      pokemon = new Pokemon(
        'bulbasaur',
        'http://pokeapi.salestock.net/api/v2/pokemon/1/'
      );
      window.localStorage.setItem(
        PokemonService.FAVORITE_POKEMONS_KEY,
        JSON.stringify([pokemon])
      );
      actions$.next(new UnfavoritePokemon(pokemon));
    });

    it('it remove the pokemon from localStorage favorite pokemons', done => {
      effects.onUnfavoritePokemon
        .pipe(take(1))
        .subscribe((effect: PushMessage) => {
          try {
            const favoritePokemons = window.localStorage.getItem(
              PokemonService.FAVORITE_POKEMONS_KEY
            );
            expect(favoritePokemons).toBeTruthy();
            expect(favoritePokemons).toBe(JSON.stringify([]));
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    describe('it effects to an action', () => {
      it(`with "${LayoutActionTypes.PushMessage}" type`, done => {
        effects.onUnfavoritePokemon
          .pipe(take(1))
          .subscribe((effect: PushMessage) => {
            try {
              expect(effect).toBeTruthy();
              expect(effect.type).toBe(LayoutActionTypes.PushMessage);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it(`with a success type message: Pokemon "bulbasaur" favorited`, done => {
        effects.onUnfavoritePokemon
          .pipe(take(1))
          .subscribe((effect: PushMessage) => {
            try {
              expect(effect).toBeTruthy();
              expect(effect.message.type).toBe(Severity.SUCCESS);
              expect(effect.message.message).toBe(
                'Pokemon "bulbasaur" removed from favorites'
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });
  });
});
