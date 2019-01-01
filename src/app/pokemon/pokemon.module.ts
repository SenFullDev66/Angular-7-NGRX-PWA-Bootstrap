import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './pokemon.effects';
import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

export const pokemonModuleImports = [
  StoreModule.forFeature('pokemon', fromPokemon.reducer),
  EffectsModule.forFeature([PokemonEffects]),
  NgbPaginationModule
];

@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PokemonRoutingModule,
    ...pokemonModuleImports
  ]
})
export class PokemonModule {}
