import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PokemonFeatureState, pokemonListSelector } from '../pokemon.reducer';
import { LoadPokemons } from '../pokemon.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokeApiNamedResource, PokeApiPageable } from '../pokeapi';
import { withLatestFrom, map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
  styleUrls: ['./pokemon-list-page.component.scss']
})
export class PokemonListPageComponent implements OnInit, OnDestroy {
  constructor(private store$: Store<PokemonFeatureState>) {}

  mounted = true;
  pokemons$: Observable<PokeApiNamedResource[]>;
  offset$ = new BehaviorSubject(0);
  limit$ = new BehaviorSubject(10);

  ngOnInit() {
    this.pokemons$ = this.store$.pipe(select(pokemonListSelector));
    this.getPageable()
      .pipe(takeWhile(() => this.mounted))
      .subscribe(pageable => this.loadPokemons(pageable));
  }

  ngOnDestroy() {
    this.mounted = false;
  }

  private getPageable(): Observable<PokeApiPageable> {
    return this.offset$.pipe(
      withLatestFrom(this.limit$),
      map(([offset, limit]) => ({ offset, limit }))
    );
  }

  private loadPokemons(pageable: PokeApiPageable): void {
    this.store$.dispatch(new LoadPokemons(pageable));
  }
}
