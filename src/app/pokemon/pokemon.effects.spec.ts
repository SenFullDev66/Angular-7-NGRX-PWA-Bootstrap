import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import { PokemonEffects } from './pokemon.effects';
import {
  PokemonActions,
  PokemonActionTypes,
  LoadPokemons,
  PokemonsLoaded
} from './pokemon.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonServiceStub } from './pokemon.service.spec';
import { PokeApiPageable } from './pokeapi';

describe('PokemonEffects', () => {
  let actions$: Subject<PokemonActions>;
  let effects: PokemonEffects;
  let stub: PokemonServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
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
    it(`without pageable it effects to ${
      PokemonActionTypes.PokemonsLoaded
    } action with pokemons list filled`, done => {
      const mock = stub.findAll();
      const { results } = mock.result;

      const action = new LoadPokemons();

      actions$.next(action);

      effects.onLoadPokemons.subscribe((effect: PokemonsLoaded) => {
        try {
          expect(effect).toBeTruthy();
          expect(effect.type).toEqual(PokemonActionTypes.PokemonsLoaded);
          expect(effect.pokemons).toEqual(results);
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

      effects.onLoadPokemons.subscribe((effect: PokemonsLoaded) => {
        try {
          expect(effect).toBeTruthy();
          expect(effect.type).toEqual(PokemonActionTypes.PokemonsLoaded);
          expect(effect.pokemons).toEqual(results);
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      mock.stub();
    });
  });
});
