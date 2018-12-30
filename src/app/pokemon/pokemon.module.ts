import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './pokemon.effects';
import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';

export const pokemonModuleImports = [
  StoreModule.forFeature('pokemon', fromPokemon.reducer),
  EffectsModule.forFeature([PokemonEffects])
];

export const pokemonModuleProviders = [PokemonService];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    PokemonRoutingModule,
    ...pokemonModuleImports
  ]
  // providers: [...pokemonModuleProviders]
})
export class PokemonModule {}
