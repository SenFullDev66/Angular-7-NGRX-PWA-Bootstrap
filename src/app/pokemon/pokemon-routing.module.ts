import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListPageComponent } from './pokemon-list-page/pokemon-list-page.component';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes), LayoutModule],
  exports: [RouterModule],
  declarations: [PokemonListPageComponent]
})
export class PokemonRoutingModule {}
