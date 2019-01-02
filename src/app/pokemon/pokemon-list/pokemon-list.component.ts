import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeApiNamedResource } from '../pokeapi';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  constructor() {}

  @Input()
  pokemons$: Observable<PokeApiNamedResource[]>;

  ngOnInit() {}
}
