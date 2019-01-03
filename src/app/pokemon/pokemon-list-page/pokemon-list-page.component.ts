import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  PokemonFeatureState,
  pokemonListSelector,
  pokemonCountSelector,
  pokemonLoadingSelector,
  pokemonPageableSelector
} from '../pokemon.reducer';
import {
  LoadPokemons,
  FavoritePokemon,
  UnfavoritePokemon
} from '../pokemon.actions';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PokeApiNamedResource, PokeApiPageable, Pokemon } from '../pokeapi';
import { withLatestFrom, map, takeWhile, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
  styleUrls: ['./pokemon-list-page.component.scss']
})
export class PokemonListPageComponent implements OnInit, OnDestroy {
  constructor(private store$: Store<PokemonFeatureState>) {}

  mounted = true;
  loading$: Observable<boolean>;
  pokemons$: Observable<Pokemon[]>;
  count$: Observable<number>;
  pageable$: Observable<PokeApiPageable>;

  page$ = new BehaviorSubject<number>(1);
  limit$ = new BehaviorSubject<number>(10);

  ngOnInit() {
    this.pokemons$ = this.store$.pipe(select(pokemonListSelector));
    this.count$ = this.store$.pipe(select(pokemonCountSelector));
    this.loading$ = this.store$.pipe(select(pokemonLoadingSelector));

    const paginationPipe = combineLatest(this.page$, this.limit$);
    this.pageable$ = paginationPipe.pipe(
      map(([page, limit]) => ({
        offset: limit * page - limit,
        limit
      }))
    );

    this.store$
      .pipe(
        takeWhile(() => this.mounted),
        select(pokemonPageableSelector),
        withLatestFrom(this.pageable$)
      )
      .subscribe(([next, current]) => {
        if (current.limit !== next.limit) {
          this.limit$.next(next.limit);
        }
        if (current.offset !== next.offset) {
          this.page$.next(this.calculatePage(next));
        }
      });

    this.pageable$
      .pipe(
        takeWhile(() => this.mounted),
        debounceTime(200)
      )
      .subscribe((pageable: PokeApiPageable) => this.loadPokemons(pageable));
  }

  ngOnDestroy() {
    this.mounted = false;
  }

  setPage(page: number): void {
    this.page$.next(page);
  }

  handlePokemonClick(pokemon: Pokemon) {
    console.log('Clicked to view details of a pokemon', pokemon);
  }

  handleSwitchFavoriteClick(pokemon: Pokemon) {
    if (pokemon.favorite) {
      this.store$.dispatch(new UnfavoritePokemon(pokemon));
    } else {
      this.store$.dispatch(new FavoritePokemon(pokemon));
    }
  }

  private loadPokemons(pageable: PokeApiPageable): void {
    this.store$.dispatch(new LoadPokemons(pageable));
  }

  private calculatePage({ offset, limit }: PokeApiPageable): number {
    const pageCount = Math.floor(offset / limit);
    return offset % limit === 0 ? pageCount + 1 : pageCount;
  }
}
