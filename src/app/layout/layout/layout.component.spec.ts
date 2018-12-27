import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { layoutModuleDeclarations } from '../layout.module';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: layoutModuleDeclarations
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be "E-PokedeX"', () => {
    expect(component.title).toBe('E-PokedeX');
  });

  it('should have a logo image', () => {
    const logo: HTMLImageElement = fixture.nativeElement.querySelector('img.logo');
    expect(logo).toBeTruthy();
    expect(logo.alt).toBe('E-PokedeX logo');
    expect(logo.src).toMatch(/\/assets\/images\/logo\.svg$/);
  });

  it('should have a span element as title', () => {
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('span.title');
    expect(span).toBeTruthy();
    expect(span.innerText).toBe(component.title);
  });

});
