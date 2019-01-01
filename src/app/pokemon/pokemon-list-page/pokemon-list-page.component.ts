import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  PokemonFeatureState,
  pokemonListSelector,
  pokemonCountSelector
} from '../pokemon.reducer';
import { LoadPokemons } from '../pokemon.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokeApiNamedResource, PokeApiPageable } from '../pokeapi';
import { withLatestFrom, map, takeWhile, take } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
  styleUrls: ['./pokemon-list-page.component.scss']
})
export class PokemonListPageComponent implements OnInit, OnDestroy {
  constructor(private store$: Store<PokemonFeatureState>) {}

  mounted = true;
  pokemons$: Observable<PokeApiNamedResource[]>;
  count$: Observable<number>;
  offset$ = new BehaviorSubject(0);
  limit$ = new BehaviorSubject(10);
  page$ = this.getPageable().pipe(
    map(pageable => this.calculatePage(pageable))
  );

  ngOnInit() {
    this.pokemons$ = this.store$.pipe(select(pokemonListSelector));
    this.count$ = this.store$.pipe(select(pokemonCountSelector));
    this.getPageable()
      .pipe(takeWhile(() => this.mounted))
      .subscribe(pageable => this.loadPokemons(pageable));
  }

  ngOnDestroy() {
    this.mounted = false;
  }

  setPage(page: number): void {
    this.getPageable()
      .pipe(take(1))
      .subscribe(({ limit }) => {
        this.offset$.next(page * limit - limit);
      });
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

  private calculatePage({ offset, limit }: PokeApiPageable): number {
    const pageCount = Math.floor(offset / limit);
    return offset % limit === 0 ? pageCount : pageCount + 1;
  }
}
