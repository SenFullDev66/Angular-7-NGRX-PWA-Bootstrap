import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import {
  layoutModuleDeclarations,
  layoutModuleImports
} from '../layout.module';
import { StoreModule } from '@ngrx/store';
import { layoutReducer } from '../layout.reducer';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...layoutModuleDeclarations],
      imports: [
        StoreModule.forRoot({
          layout: layoutReducer
        }),
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

  // it('title should be "E-PokedeX"', () => {
  //   expect(component.title).toBe('E-PokedeX');
  // });

  describe('header section', () => {
    let header: HTMLHeadingElement;
    beforeEach(() => {
      header = fixture.nativeElement.querySelector('.header');
    });

    it('should exist', () => {
      expect(header).toBeTruthy();
    });

    it('should have a logo image', () => {
      const logo: HTMLImageElement = header.querySelector('img.logo');
      expect(logo).toBeTruthy();
      expect(logo.alt).toBe('E-PokedeX logo');
      expect(logo.src).toMatch(/\/assets\/images\/logo\.svg(\?.+)?$/);
    });

    it('should have a span element as title', () => {
      const span: HTMLSpanElement = header.querySelector('span.title');
      expect(span).toBeTruthy();
      expect(span.textContent).toBe('E-PokedeX');
    });
  });

  describe('content section', () => {
    let content: HTMLElement;
    beforeEach(() => {
      content = fixture.nativeElement.querySelector('.content');
    });

    it('should have a navbar', () => {
      const navbar = content.querySelector('nav.navbar');
      expect(navbar).toBeTruthy();
    });

    it('should have a title with same value of component title property', () => {
      const titleEl = content.querySelector('nav.navbar > .navbar-brand');
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toBe('E-PokedeX');
    });
  });
});
