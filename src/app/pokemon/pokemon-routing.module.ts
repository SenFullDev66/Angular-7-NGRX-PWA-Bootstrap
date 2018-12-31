import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListPageComponent } from './pokemon-list-page/pokemon-list-page.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [PokemonListPageComponent]
})
export class PokemonRoutingModule {}
