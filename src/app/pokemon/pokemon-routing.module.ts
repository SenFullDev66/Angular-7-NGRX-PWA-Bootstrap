import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListPageComponent } from './pokemon-list-page/pokemon-list-page.component';
import { LayoutModule } from '../layout/layout.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: '', component: PokemonListPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), LayoutModule, NgbPaginationModule],
  exports: [RouterModule, PokemonListPageComponent],
  declarations: [PokemonListPageComponent]
})
export class PokemonRoutingModule {}
