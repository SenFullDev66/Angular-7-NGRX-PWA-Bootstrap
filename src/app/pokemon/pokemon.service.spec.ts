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
  PokeApiPokemonList
} from './pokeapi';
import { Injectable } from '@angular/core';

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
});

export interface Stub<Result = any> {
  result: Result;
  stub(): void;
}

@Injectable()
export class PokemonServiceStub {
  constructor(private stub: HttpTestingController) {}

  findAll(
    pageable: PokeApiPageable = { offset: 0, limit: 10 }
  ): Stub<PokeApiPokemonList> {
    const { offset = 0, limit = 10 } = pageable;
    const count = 1;
    const results: PokeApiNamedResource[] = [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/'
      }
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
