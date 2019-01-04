import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { PokemonDetail } from '../pokeapi';
import { switchMap, take, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { PokemonFeatureState } from '../pokemon.reducer';
import { PushMessage } from 'src/app/layout/layout.actions';

@Component({
  selector: 'app-pokemon-detail-page',
  templateUrl: './pokemon-detail-page.component.html',
  styleUrls: ['./pokemon-detail-page.component.scss']
})
export class PokemonDetailPageComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private store$: Store<PokemonFeatureState>,
    private route: ActivatedRoute
  ) {}

  loading = true;
  title$ = new BehaviorSubject<string>('Loading pokemon detail');
  pokemon: PokemonDetail;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        take(1),
        switchMap(params => this.pokemonService.findOne(params.get('name'))),
        catchError((error: HttpErrorResponse) => {
          this.store$.dispatch(PushMessage.danger(error.statusText));
          return of(error);
        })
      )
      .subscribe((pokemon: PokemonDetail) => {
        this.loading = false;
        this.pokemon = pokemon;
        this.title$.next(`Details of ${pokemon.name}`);
      });
  }

  back() {
    this.router.navigate(['/']);
  }
}
