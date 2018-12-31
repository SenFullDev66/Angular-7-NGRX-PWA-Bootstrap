import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  PokemonFeatureState,
  pokemonPaginatedListSelector
} from '../pokemon.reducer';
import { LoadPokemons } from '../pokemon.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokeApiNamedResource, PokeApiPageable } from '../pokeapi';
import { withLatestFrom, map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
  styleUrls: ['./pokemon-list-page.component.css']
})
export class PokemonListPageComponent implements OnInit {
  constructor(private store$: Store<PokemonFeatureState>) {}

  pokemons$: Observable<PokeApiNamedResource[]>;
  offset$ = new BehaviorSubject(0);
  limit$ = new BehaviorSubject(10);

  ngOnInit() {
    this.pokemons$ = this.store$.pipe(
      withLatestFrom(this.getPageable()),
      map(([state, pageable]) => pokemonPaginatedListSelector(state, pageable))
    );

    this.store$.dispatch(new LoadPokemons());
  }

  private getPageable(): Observable<PokeApiPageable> {
    return this.offset$.pipe(
      withLatestFrom(this.limit$),
      map(([offset, limit]) => ({ offset, limit }))
    );
  }
}
