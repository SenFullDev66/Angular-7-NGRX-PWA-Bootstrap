import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailPageComponent } from './pokemon-detail-page.component';
import {
  pokemonModuleImports,
  pokemonModuleProviders
} from '../pokemon.module';
import { PokemonService } from '../pokemon.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from 'src/app/layout/layout.module';

describe('PokemonDetailPageComponent', () => {
  let component: PokemonDetailPageComponent;
  let fixture: ComponentFixture<PokemonDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule,
        LayoutModule,
        ...pokemonModuleImports
      ],
      providers: [...pokemonModuleProviders],
      declarations: [PokemonDetailPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
