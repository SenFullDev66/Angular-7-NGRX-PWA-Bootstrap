import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { of } from 'rxjs';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with @Input() pokemons observable', () => {
    describe('resolved to a array with one pokemon', () => {
      beforeEach(() => {
        component.pokemons$ = of([
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/'
          }
        ]);
        fixture.detectChanges();
      });

      it('it has a table', () => {
        const table = fixture.nativeElement.querySelector('table.table');
        expect(table).toBeTruthy();
      });

      it('the table has a header', () => {
        const header = fixture.nativeElement.querySelector(
          'table.table > thead'
        );
        expect(header).toBeTruthy();
      });

      it('the table header has 2 columns', () => {
        const headers: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          'table.table > thead > tr > th'
        );
        expect(headers).toBeTruthy();
        expect(headers.length).toBe(2);
      });

      it('the table has a body', () => {
        const body = fixture.nativeElement.querySelector('table.table > tbody');
        expect(body).toBeTruthy();
      });

      it('the table body has one row', () => {
        const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          'table.table > tbody > tr'
        );
        expect(rows).toBeTruthy();
        expect(rows.length).toBe(1);
      });

      describe('the table row', () => {
        let columns: HTMLElement[];

        beforeEach(() => {
          columns = fixture.nativeElement.querySelectorAll(
            'table.table > tbody > tr > td'
          );
        });

        it('has 2 columns', () => {
          expect(columns).toBeTruthy();
          expect(columns.length).toBe(2);
        });

        it('its first column value is "bulbasaur"', () => {
          const column = columns[0];
          expect(column).toBeTruthy();
          expect(column.textContent).toBe('bulbasaur');
        });

        it('its second column has a view button', () => {
          const column = columns[1];
          expect(column).toBeTruthy();

          const button = column.querySelector('button');
          expect(button).toBeTruthy();
          expect(button.textContent).toBe('View');
        });
      });
    });

    describe('resolved to a empty array', () => {
      beforeEach(() => {
        component.pokemons$ = of([]);
        fixture.detectChanges();
      });

      it('it has a table', () => {
        const table = fixture.nativeElement.querySelector('table.table');
        expect(table).toBeTruthy();
      });

      it('the table has a header', () => {
        const header = fixture.nativeElement.querySelector(
          'table.table > thead'
        );
        expect(header).toBeTruthy();
      });

      it('the table header has 2 columns', () => {
        const headers: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          'table.table > thead > tr > th'
        );
        expect(headers).toBeTruthy();
        expect(headers.length).toBe(2);
      });

      it('the table has a body', () => {
        const body = fixture.nativeElement.querySelector('table.table > tbody');
        expect(body).toBeTruthy();
      });

      it('the table body has one row', () => {
        const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          'table.table > tbody > tr'
        );
        expect(rows).toBeTruthy();
        expect(rows.length).toBe(1);
      });

      it('the table row has one column with colspan 2', () => {
        const col: HTMLTableColElement = fixture.nativeElement.querySelector(
          'table.table > tbody > tr > td'
        );
        expect(col).toBeTruthy();
        expect(col.getAttribute('colspan')).toBe('2');
      });

      it('the table row has "No results found" text', () => {
        const col: HTMLTableColElement = fixture.nativeElement.querySelector(
          'table.table > tbody > tr > td'
        );
        expect(col).toBeTruthy();
        expect(col.textContent).toBe('No results found');
      });
    });
  });
});
