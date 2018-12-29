import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import {
  layoutModuleDeclarations,
  layoutModuleImports
} from '../layout.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...layoutModuleDeclarations],
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ...layoutModuleImports
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be "E-PokédeX"', done => {
    expect(component.title).toBeTruthy();

    component.title.subscribe(title => {
      try {
        expect(title).toBe('E-PokédeX');
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });

  describe('header section', () => {
    let header: HTMLHeadingElement;
    beforeEach(() => {
      header = fixture.nativeElement.querySelector('.header');
    });

    it('should exist', () => {
      expect(header).toBeTruthy();
    });

    it('should have a h1 element as title', () => {
      const h1: HTMLHeadingElement = header.querySelector('h1.title');
      const solid: HTMLSpanElement = h1.querySelector('.solid');
      const hollow: HTMLSpanElement = h1.querySelector('.hollow');
      expect(solid).toBeTruthy();
      expect(solid.textContent).toBe('E-PokédeX');
      expect(hollow).toBeTruthy();
      expect(hollow.textContent).toBe('E-PokédeX');
    });
  });

  describe('navbar', () => {
    it('should exist', () => {
      const navbar = fixture.nativeElement.querySelector('nav.navbar');
      expect(navbar).toBeTruthy();
    });

    it('should have a title with same value of component title property', done => {
      const titleEl = fixture.nativeElement.querySelector(
        'nav.navbar .navbar-brand'
      );
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toBeTruthy();
      component.title.subscribe(title => {
        try {
          expect(titleEl.textContent).toBe(title);
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
});
