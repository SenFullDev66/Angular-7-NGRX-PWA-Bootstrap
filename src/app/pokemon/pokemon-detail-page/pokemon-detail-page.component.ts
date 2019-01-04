import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokemonDetail } from '../pokeapi';
import { switchMap, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-detail-page',
  templateUrl: './pokemon-detail-page.component.html',
  styleUrls: ['./pokemon-detail-page.component.scss']
})
export class PokemonDetailPageComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  loading = true;
  title$ = new BehaviorSubject<string>('Loading pokemon detail');
  pokemon: PokemonDetail;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        take(1),
        switchMap(params => this.pokemonService.findOne(params.get('name')))
      )
      .subscribe(pokemon => {
        this.loading = false;
        this.pokemon = pokemon;
        this.title$.next(`Details of ${pokemon.name}`);
      });
  }
}
