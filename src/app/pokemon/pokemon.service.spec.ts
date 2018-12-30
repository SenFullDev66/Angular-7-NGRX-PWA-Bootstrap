import { TestBed } from '@angular/core/testing';
import { Injectable, Injector } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { Pokemons } from './pokemon';

describe('PokemonService', () => {
  let service: PokemonService;
  let stub: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(PokemonService);
    stub = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll function', () => {
    it('without parameter it returns a pokemons list of offset 0 and limit 10', done => {
      const count = 1;
      const results: Pokemons = [{ id: '123', name: 'Pikachu' }];

      service.findAll().subscribe(pokemons => {
        try {
          expect(pokemons.count).toEqual(count);
          expect(pokemons.results).toEqual(results);
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      stub
        .expectOne('/api/pokemon?offset=0&limit=10')
        .flush({ count, results });
    });

    it('with pageable with offset 10, it returns a pokemon list of offset 10 and limit 10', done => {
      const count = 1;
      const results: Pokemons = [{ id: '123', name: 'Pikachu' }];

      service.findAll({ offset: 10 }).subscribe(pokemons => {
        try {
          expect(pokemons.count).toEqual(count);
          expect(pokemons.results).toEqual(results);
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      stub
        .expectOne('/api/pokemon?offset=10&limit=10')
        .flush({ count, results });
    });

    it('with pageable with limit 50, it returns a pokemon list of offset 0 and limit 50', done => {
      const count = 1;
      const results: Pokemons = [{ id: '123', name: 'Pikachu' }];

      service.findAll({ limit: 50 }).subscribe(pokemons => {
        try {
          expect(pokemons.count).toEqual(count);
          expect(pokemons.results).toEqual(results);
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      stub
        .expectOne('/api/pokemon?offset=0&limit=50')
        .flush({ count, results });
    });
  });
});
