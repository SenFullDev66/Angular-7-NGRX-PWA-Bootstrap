import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../pokeapi';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  constructor() {}

  @Input()
  pokemons$: Observable<Pokemon[]>;

  @Output()
  pokemonClick = new EventEmitter<Pokemon>();

  @Output()
  switchFavoriteClick = new EventEmitter<Pokemon>();

  ngOnInit() {}

  handlePokemonClick(pokemon: Pokemon) {
    this.pokemonClick.emit(pokemon);
  }

  handleSwitchFavoriteClick(pokemon: Pokemon) {
    this.switchFavoriteClick.emit(pokemon);
  }
}
