import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './pokemon.effects';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonService } from './pokemon.service';

export const pokemonModuleImports = [
  StoreModule.forFeature('pokemon', fromPokemon.reducer),
  EffectsModule.forFeature([PokemonEffects])
];

export const pokemonModuleProviders = [PokemonService];

@NgModule({
  declarations: [PokemonListComponent],
  imports: [CommonModule, HttpClientModule, ...pokemonModuleImports],
  providers: [...pokemonModuleProviders],
  exports: [PokemonListComponent]
})
export class PokemonModule {}
