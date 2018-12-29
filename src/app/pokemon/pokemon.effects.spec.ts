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

describe('PokemonEffects', () => {
  let actions$: Subject<PokemonActions>;
  let effects: PokemonEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonEffects, provideMockActions(() => actions$)]
    });
    actions$ = new ReplaySubject();
    effects = TestBed.get(PokemonEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe(`on "${PokemonActionTypes.LoadPokemons}" action`, () => {
    it(`it effects to ${
      PokemonActionTypes.PokemonsLoaded
    } action with pokemons list filled`, done => {
      const action = new LoadPokemons();

      actions$.next(action);

      effects.onLoadPokemons.subscribe((effect: PokemonsLoaded) => {
        try {
          expect(effect).toBeTruthy();
          expect(effect.type).toEqual(PokemonActionTypes.PokemonsLoaded);
          expect(effect.pokemons).toEqual([{ id: '123', name: 'Pikachu' }]);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
});
