import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import {
  PokeApiNamedResource,
  PokeApiPageable,
  PokeApiList,
  PokeApiPokemonList,
  Pokemon
} from './pokeapi';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

describe('PokemonService', () => {
  let service: PokemonService;
  let stub: PokemonServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService, PokemonServiceStub]
    });
    service = TestBed.get(PokemonService);
    stub = TestBed.get(PokemonServiceStub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll function', () => {
    it('without parameter it returns a pokemons list of offset 0 and limit 10', done => {
      const mock = stub.findAll();
      const { count, results } = mock.result;
      service.findAll().subscribe(pokemons => {
        try {
          expect(pokemons.count).toEqual(count);
          expect(pokemons.results).toEqual(results);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
      mock.stub();
    });

    it('with pageable with offset 10, it returns a pokemon list of offset 10 and limit 10', done => {
      const pageable = { offset: 10 };
      const mock = stub.findAll(pageable);
      const { count, results } = mock.result;

      service.findAll(pageable).subscribe(pokemons => {
        try {
          expect(pokemons.count).toEqual(count);
          expect(pokemons.results).toEqual(results);
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      mock.stub();
    });

    it('with pageable with limit 50, it returns a pokemon list of offset 0 and limit 50', done => {
      const pageable = { limit: 50 };
      const mock = stub.findAll(pageable);
      const { count, results } = mock.result;

      service.findAll(pageable).subscribe(pokemons => {
        try {
          expect(pokemons.count).toEqual(count);
          expect(pokemons.results).toEqual(results);
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      mock.stub();
    });
  });

  describe('restoreFavorites function', () => {
    beforeEach(() => {
      window.localStorage.removeItem(PokemonService.FAVORITE_POKEMONS_KEY);
    });

    it('when the localStorage entry does not exists, it restore a empty array', done => {
      service
        .restoreFavorites()
        .pipe(take(1))
        .subscribe(favorites => {
          try {
            expect(favorites).toEqual([]);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    it('when the localStorage has a entry with 50 pokemons, it restore a array with 50 pokemons', done => {
      window.localStorage.setItem(
        PokemonService.FAVORITE_POKEMONS_KEY,
        JSON.stringify(POKEMONS_MOCK)
      );
      service
        .restoreFavorites()
        .pipe(take(1))
        .subscribe(favorites => {
          try {
            expect(favorites).toBeTruthy();
            expect(favorites.length).toBe(50);
            expect(favorites[0].name).toBe('bulbasaur');
            expect(favorites[49].name).toBe('diglett');
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });

  describe('storeFavorites function', () => {
    beforeEach(() => {
      window.localStorage.removeItem(PokemonService.FAVORITE_POKEMONS_KEY);
    });

    it('when the localStorage entry does not exists, it includes the entry', () => {
      expect(stored()).toBeFalsy();
      service.storeFavorites(POKEMONS_MOCK);
      expect(stored()).toBeTruthy();
      expect(stored()).toEqual(JSON.stringify(POKEMONS_MOCK));
    });

    it('when the localStorage entry exists, it appends the pokemons to that entry', () => {
      const initial = POKEMONS_MOCK.slice(0, 10);
      const initialStr = JSON.stringify(initial);
      window.localStorage.setItem(
        PokemonService.FAVORITE_POKEMONS_KEY,
        initialStr
      );
      const pokemons = POKEMONS_MOCK.slice(10, 20);
      service.storeFavorites(pokemons);
      expect(stored()).toBeTruthy();
      expect(stored()).toEqual(JSON.stringify([...pokemons, ...initial]));
    });
  });

  describe('removeFromFavorites function', () => {
    beforeEach(() => {
      window.localStorage.removeItem(PokemonService.FAVORITE_POKEMONS_KEY);
    });

    it('when the localStorage entry does not exists, no error are thrown', () => {
      const pokemon = new Pokemon(
        'bulbasaur',
        'http://pokeapi.salestock.net/api/v2/pokemon/1/'
      );
      service.removeFromFavorites(pokemon);
      expect(stored()).toBeFalsy();
    });

    it('when the localStorage entry has one pokemon, it removes its pokemon from the array', () => {
      const pokemon = new Pokemon(
        'bulbasaur',
        'http://pokeapi.salestock.net/api/v2/pokemon/1/'
      );
      const pokemons = [pokemon];
      window.localStorage.setItem(
        PokemonService.FAVORITE_POKEMONS_KEY,
        JSON.stringify(pokemons)
      );
      service.removeFromFavorites(pokemon);
      expect(stored()).toBe(JSON.stringify([]));
    });
  });
});

const stored = () =>
  window.localStorage.getItem(PokemonService.FAVORITE_POKEMONS_KEY);

export const POKEMONS_MOCK = [
  new Pokemon('bulbasaur', 'http://pokeapi.salestock.net/api/v2/pokemon/1/'),
  new Pokemon('ivysaur', 'http://pokeapi.salestock.net/api/v2/pokemon/2/'),
  new Pokemon('venusaur', 'http://pokeapi.salestock.net/api/v2/pokemon/3/'),
  new Pokemon('charmander', 'http://pokeapi.salestock.net/api/v2/pokemon/4/'),
  new Pokemon('charmeleon', 'http://pokeapi.salestock.net/api/v2/pokemon/5/'),
  new Pokemon('charizard', 'http://pokeapi.salestock.net/api/v2/pokemon/6/'),
  new Pokemon('squirtle', 'http://pokeapi.salestock.net/api/v2/pokemon/7/'),
  new Pokemon('wartortle', 'http://pokeapi.salestock.net/api/v2/pokemon/8/'),
  new Pokemon('blastoise', 'http://pokeapi.salestock.net/api/v2/pokemon/9/'),
  new Pokemon('caterpie', 'http://pokeapi.salestock.net/api/v2/pokemon/10/'),
  new Pokemon('metapod', 'http://pokeapi.salestock.net/api/v2/pokemon/11/'),
  new Pokemon('butterfree', 'http://pokeapi.salestock.net/api/v2/pokemon/12/'),
  new Pokemon('weedle', 'http://pokeapi.salestock.net/api/v2/pokemon/13/'),
  new Pokemon('kakuna', 'http://pokeapi.salestock.net/api/v2/pokemon/14/'),
  new Pokemon('beedrill', 'http://pokeapi.salestock.net/api/v2/pokemon/15/'),
  new Pokemon('pidgey', 'http://pokeapi.salestock.net/api/v2/pokemon/16/'),
  new Pokemon('pidgeotto', 'http://pokeapi.salestock.net/api/v2/pokemon/17/'),
  new Pokemon('pidgeot', 'http://pokeapi.salestock.net/api/v2/pokemon/18/'),
  new Pokemon('rattata', 'http://pokeapi.salestock.net/api/v2/pokemon/19/'),
  new Pokemon('raticate', 'http://pokeapi.salestock.net/api/v2/pokemon/20/'),
  new Pokemon('spearow', 'http://pokeapi.salestock.net/api/v2/pokemon/21/'),
  new Pokemon('fearow', 'http://pokeapi.salestock.net/api/v2/pokemon/22/'),
  new Pokemon('ekans', 'http://pokeapi.salestock.net/api/v2/pokemon/23/'),
  new Pokemon('arbok', 'http://pokeapi.salestock.net/api/v2/pokemon/24/'),
  new Pokemon('pikachu', 'http://pokeapi.salestock.net/api/v2/pokemon/25/'),
  new Pokemon('raichu', 'http://pokeapi.salestock.net/api/v2/pokemon/26/'),
  new Pokemon('sandshrew', 'http://pokeapi.salestock.net/api/v2/pokemon/27/'),
  new Pokemon('sandslash', 'http://pokeapi.salestock.net/api/v2/pokemon/28/'),
  new Pokemon('nidoran-f', 'http://pokeapi.salestock.net/api/v2/pokemon/29/'),
  new Pokemon('nidorina', 'http://pokeapi.salestock.net/api/v2/pokemon/30/'),
  new Pokemon('nidoqueen', 'http://pokeapi.salestock.net/api/v2/pokemon/31/'),
  new Pokemon('nidoran-m', 'http://pokeapi.salestock.net/api/v2/pokemon/32/'),
  new Pokemon('nidorino', 'http://pokeapi.salestock.net/api/v2/pokemon/33/'),
  new Pokemon('nidoking', 'http://pokeapi.salestock.net/api/v2/pokemon/34/'),
  new Pokemon('clefairy', 'http://pokeapi.salestock.net/api/v2/pokemon/35/'),
  new Pokemon('clefable', 'http://pokeapi.salestock.net/api/v2/pokemon/36/'),
  new Pokemon('vulpix', 'http://pokeapi.salestock.net/api/v2/pokemon/37/'),
  new Pokemon('ninetales', 'http://pokeapi.salestock.net/api/v2/pokemon/38/'),
  new Pokemon('jigglypuff', 'http://pokeapi.salestock.net/api/v2/pokemon/39/'),
  new Pokemon('wigglytuff', 'http://pokeapi.salestock.net/api/v2/pokemon/40/'),
  new Pokemon('zubat', 'http://pokeapi.salestock.net/api/v2/pokemon/41/'),
  new Pokemon('golbat', 'http://pokeapi.salestock.net/api/v2/pokemon/42/'),
  new Pokemon('oddish', 'http://pokeapi.salestock.net/api/v2/pokemon/43/'),
  new Pokemon('gloom', 'http://pokeapi.salestock.net/api/v2/pokemon/44/'),
  new Pokemon('vileplume', 'http://pokeapi.salestock.net/api/v2/pokemon/45/'),
  new Pokemon('paras', 'http://pokeapi.salestock.net/api/v2/pokemon/46/'),
  new Pokemon('parasect', 'http://pokeapi.salestock.net/api/v2/pokemon/47/'),
  new Pokemon('venonat', 'http://pokeapi.salestock.net/api/v2/pokemon/48/'),
  new Pokemon('venomoth', 'http://pokeapi.salestock.net/api/v2/pokemon/49/'),
  new Pokemon('diglett', 'http://pokeapi.salestock.net/api/v2/pokemon/50/')
];

export interface Stub<Result = any> {
  result: Result;
  stub(): void;
}

@Injectable()
export class PokemonServiceStub {
  constructor(private stub: HttpTestingController) {}

  serviceUnavailable(): Stub<any> {
    return {
      result: {},
      stub: () => {
        this.stub
          .match(() => true)[0]
          .error(
            new ErrorEvent('Service unavailable', {
              message: 'Service unavailable'
            }),
            {
              status: 503,
              statusText: 'Service unavailable'
            }
          );
        this.stub.verify();
      }
    };
  }

  findAll(
    pageable: PokeApiPageable = { offset: 0, limit: 10 }
  ): Stub<PokeApiList<Pokemon>> {
    const { offset = 0, limit = 10 } = pageable;
    const count = 1;
    const results: Pokemon[] = [
      new Pokemon('bulbasaur', 'https://pokeapi.co/api/v2/pokemon/1/')
    ];

    return {
      result: { count, results },
      stub: () =>
        this.stub
          .expectOne(`/api/v2/pokemon?offset=${offset}&limit=${limit}`)
          .flush({ count, results })
    };
  }
}
