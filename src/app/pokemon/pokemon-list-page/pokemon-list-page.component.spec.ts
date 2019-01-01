import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListPageComponent } from './pokemon-list-page.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { pokemonModuleImports } from '../pokemon.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokemonListPageComponent', () => {
  let component: PokemonListPageComponent;
  let fixture: ComponentFixture<PokemonListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        LayoutModule,
        ...pokemonModuleImports
      ],
      providers: [],
      declarations: [PokemonListComponent, PokemonListPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
