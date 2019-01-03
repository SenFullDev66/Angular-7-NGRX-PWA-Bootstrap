import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFavoriteListPageComponent } from './pokemon-favorite-list-page.component';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import {
  pokemonModuleProviders,
  pokemonModuleImports
} from '../pokemon.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokemonFavoriteListPageComponent', () => {
  let component: PokemonFavoriteListPageComponent;
  let fixture: ComponentFixture<PokemonFavoriteListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule,
        NgbPaginationModule,
        LayoutModule,
        ...pokemonModuleImports
      ],
      providers: [...pokemonModuleProviders],
      declarations: [PokemonListComponent, PokemonFavoriteListPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFavoriteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
