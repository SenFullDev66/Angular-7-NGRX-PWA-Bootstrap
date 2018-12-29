import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './pokemon.effects';

export const pokemonModuleImports = [
  StoreModule.forFeature('pokemon', fromPokemon.reducer),
  EffectsModule.forFeature([PokemonEffects])
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ...pokemonModuleImports
  ]
})
export class PokemonModule { }
