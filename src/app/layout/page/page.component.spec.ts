import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { layoutModuleImports } from '../layout.module';
import { StoreModule } from '@ngrx/store';
import { layoutReducer } from '../layout.reducer';
import { EffectsModule, Actions, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { Component, ViewChild, OnInit, Injectable } from '@angular/core';
import { LayoutActionTypes } from '../layout.actions';
import { map } from 'rxjs/operators';

describe('PageComponent', () => {
  let component: PageHostComponent;
  let fixture: ComponentFixture<PageHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          layout: layoutReducer
        }),
        EffectsModule.forRoot([TestEffect]),
        ...layoutModuleImports
      ],
      providers: [TestEffect],
      declarations: [PageComponent, PageHostComponent]
    }).compileComponents();
  }));

  it('should create', () => {
    createPageComponent('Teste');
    expect(component).toBeTruthy();
  });

  describe('with string "Title A" title input', async () => {
    const title = 'Title A';
    let wrapped: PageComponent;
    beforeEach(() => {
      createPageComponent(title);
      wrapped = component.wrapped;
    });

    it('it immediatly changes document title to "E-PokedeX - Title A"', () => {
      expect(document.title).toEqual('E-PokedeX - Title A');
    });

    it('the "loading" property is false', async () => {
      expect(await wrapped.loading).toBeFalsy();
    });

    it('the "loading" element is undefined', () => {
      const loading: HTMLDivElement = fixture.nativeElement.querySelector(
        '.loading'
      );
      expect(loading).toBeFalsy();
    });

    it('the "content" element is defined', () => {
      const content: HTMLDivElement = fixture.nativeElement.querySelector(
        '.content'
      );
      expect(content).toBeTruthy();
    });

    it('it displays the span child element', () => {
      const child: HTMLSpanElement = fixture.nativeElement.querySelector(
        '.content span.test'
      );
      expect(child).toBeTruthy();
      expect(child.innerText).toEqual('This is a testing page');
    });
  });

  describe('with an observable that resolves to "Title B"', () => {
    const title = 'Title B';
    let wrapped: PageComponent;
    let resolve: Function;

    beforeEach(() => {
      document.title = 'E-PokedeX - Starting';
      const observable = from(
        new Promise<string>(_resolve => {
          resolve = () => _resolve(title);
        })
      );
      createPageComponent(observable);
      wrapped = component.wrapped;
    });

    describe('when it\'s not resolved yet', () => {
      it('the document title keeps unchanged', () => {
        expect(document.title).toEqual('E-PokedeX - Starting');
      });

      it('the loading property is true', async () => {
        expect(await wrapped.loading).toBeTruthy();
      });

      it('the "loading" element is defined', () => {
        const loading: HTMLDivElement = fixture.nativeElement.querySelector(
          '.loading'
        );
        expect(loading).toBeTruthy();
      });

      it('the "content" element is undefined', () => {
        const content: HTMLDivElement = fixture.nativeElement.querySelector(
          '.content'
        );
        expect(content).toBeFalsy();
      });

      it('it does not display the span child element', () => {
        const child: HTMLSpanElement = fixture.nativeElement.querySelector(
          '.content span.test'
        );
        expect(child).toBeFalsy();
      });
    });

    describe('when it is resolved', () => {
      beforeEach(async () => {
        await resolve();
        await fixture.detectChanges();
      });

      it('it changes document title to "E-PokedeX - Title B"', done => {
        document.addEventListener('document.title.changed', () => {
          try {
            expect(document.title).toEqual('E-PokedeX - Title B');
            done();
          } catch (e) {
            done.fail(e);
          }
        });
      });

      it('the "loading" property is false', async () => {
        expect(await wrapped.loading).toBeFalsy();
      });

      it('the "loading" element is undefined', () => {
        const loading: HTMLDivElement = fixture.nativeElement.querySelector(
          '.loading'
        );
        expect(loading).toBeFalsy();
      });

      it('the "content" element is defined', () => {
        const content: HTMLDivElement = fixture.nativeElement.querySelector(
          '.content'
        );
        expect(content).toBeTruthy();
      });

      it('it displays the span child element', () => {
        const child: HTMLSpanElement = fixture.nativeElement.querySelector(
          '.content span.test'
        );
        expect(child).toBeTruthy();
        expect(child.innerText).toEqual('This is a testing page');
      });
    });
  });

  function createPageComponent(title: Observable<string> | string) {
    fixture = TestBed.createComponent(PageHostComponent);
    component = fixture.componentInstance;
    component.title = title;
    fixture.detectChanges();
  }
});

@Component({
  selector: 'app-page-host',
  template: `
    <app-page *ngIf="title" [title]="title"
      ><span class="test">This is a testing page</span></app-page
    >
  `
})
class PageHostComponent {
  title: Observable<string> | string;

  @ViewChild(PageComponent)
  wrapped: PageComponent;
}

@Injectable()
class TestEffect {
  constructor(private actions$: Actions) {}

  onTitleChanged = this.actions$.pipe(
    ofType(LayoutActionTypes.TitleChanged),
    map(() => document.dispatchEvent(new Event('document.title.changed')))
  );
}
