import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  PokemonFeatureState,
  pokemonFavoritePokemonsSelector,
  pokemonFavoritesLoadedSelector,
  pokemonLoadingFavoritesSelector,
  pokemonFavoriteCountSelector
} from '../pokemon.reducer';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Pokemon } from '../pokeapi';
import { map, mergeMap, takeWhile, filter, take } from 'rxjs/operators';
import { LoadFavoritePokemons, UnfavoritePokemon } from '../pokemon.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-favorite-list-page',
  templateUrl: './pokemon-favorite-list-page.component.html',
  styleUrls: ['./pokemon-favorite-list-page.component.scss']
})
export class PokemonFavoriteListPageComponent implements OnInit, OnDestroy {
  constructor(
    private store$: Store<PokemonFeatureState>,
    private router: Router
  ) {}

  mounted = true;
  pokemons$: Observable<Pokemon[]>;
  count$: Observable<number>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  page$ = new BehaviorSubject(1);
  limit$ = new BehaviorSubject(10);

  ngOnInit() {
    this.loaded$ = this.store$.pipe(select(pokemonFavoritesLoadedSelector));
    this.loading$ = this.store$.pipe(select(pokemonLoadingFavoritesSelector));
    this.count$ = this.store$.pipe(select(pokemonFavoriteCountSelector));
    this.pokemons$ = combineLatest(this.page$, this.limit$).pipe(
      map(([page, limit]) => ({
        offset: limit * page - limit,
        limit
      })),
      mergeMap(pageable =>
        this.store$.pipe(select(pokemonFavoritePokemonsSelector, pageable))
      )
    );

    combineLatest(this.loaded$, this.loading$)
      .pipe(
        takeWhile(() => this.mounted),
        filter(([loaded, loading]) => {
          return !loaded && !loading;
        })
      )
      .subscribe(() => this.store$.dispatch(new LoadFavoritePokemons()));
  }

  ngOnDestroy() {
    this.mounted = false;
  }

  setPage(page: number) {
    this.page$.next(page);
  }

  handlePokemonClick(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.name]);
  }

  handleSwitchFavoriteClick(pokemon: Pokemon) {
    this.store$.dispatch(new UnfavoritePokemon(pokemon));
  }
}
