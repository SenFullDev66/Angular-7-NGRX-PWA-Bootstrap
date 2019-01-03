import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { PokeApiNamedResource, Pokemon } from '../pokeapi';
import { take, first } from 'rxjs/operators';

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

  describe('the @Output() pokemonClick event emitter', () => {
    it('when provided, it gets triggered when component handlePokemonClick function is called', done => {
      const pokemon: Pokemon = new Pokemon(
        'bulbasaur',
        'https://pokeapi.co/api/v2/pokemon/1/'
      );
      component.pokemonClick.pipe(take(1)).subscribe(event => {
        try {
          expect(event).toBe(pokemon);
          done();
        } catch (e) {
          done.fail(e);
        }
      });

      component.handlePokemonClick(pokemon);
    });
  });

  describe('with @Input() pokemons observable', () => {
    describe('resolved to a array with two pokemons', () => {
      let pokemons: Pokemon[];
      beforeEach(() => {
        pokemons = [
          new Pokemon(
            'bulbasaur',
            'https://pokeapi.co/api/v2/pokemon/1/',
            false
          ),
          new Pokemon('ivysaur', 'https://pokeapi.co/api/v2/pokemon/2/', true)
        ];
        component.pokemons$ = of(pokemons);
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

      it('the table header has 3 columns', () => {
        const headers: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          'table.table > thead > tr > th'
        );
        expect(headers).toBeTruthy();
        expect(headers.length).toBe(3);
      });

      it('the table has a body', () => {
        const body = fixture.nativeElement.querySelector('table.table > tbody');
        expect(body).toBeTruthy();
      });

      it('the table body has two rows', () => {
        const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          'table.table > tbody > tr'
        );
        expect(rows).toBeTruthy();
        expect(rows.length).toBe(2);
      });

      describe('and the table body', () => {
        let firstRowColumns: NodeListOf<HTMLTableCellElement>;
        let secondRowColumns: NodeListOf<HTMLTableCellElement>;
        let rows: HTMLTableRowElement[];
        beforeEach(() => {
          rows = fixture.nativeElement.querySelectorAll(
            'table.table > tbody > tr'
          );
          firstRowColumns = rows[0].querySelectorAll('td');
          secondRowColumns = rows[1].querySelectorAll('td');
        });

        describe('first row', () => {
          it('has 3 columns', () => {
            expect(firstRowColumns).toBeTruthy();
            expect(firstRowColumns.length).toBe(3);
          });

          it('its first column has a image of the pokemon', () => {
            const column = firstRowColumns[0];
            expect(column).toBeTruthy();
            const image: HTMLImageElement = column.querySelector('img');
            expect(image).toBeTruthy();
            expect(image.src).toBe(pokemons[0].imageSrc);
          });

          it('its second column value is "bulbasaur"', () => {
            const column = firstRowColumns[1];
            expect(column).toBeTruthy();
            expect(column.textContent).toBe('bulbasaur');
          });

          it('its third column has a "View" button', () => {
            const column = firstRowColumns[2];
            expect(column).toBeTruthy();

            const buttons: NodeListOf<
              HTMLButtonElement
            > = column.querySelectorAll('button');
            expect(buttons.length).toBe(2);
            expect(buttons[0].textContent.trim()).toBe('View');
          });

          it('the third column has a "Favorite" button', () => {
            const column = firstRowColumns[2];
            expect(column).toBeTruthy();

            const buttons: NodeListOf<
              HTMLButtonElement
            > = column.querySelectorAll('button');
            expect(buttons.length).toBe(2);
            expect(buttons[1].textContent.trim()).toBe('Favorite');
          });
        });

        describe('second row', () => {
          it('has 3 columns', () => {
            expect(secondRowColumns).toBeTruthy();
            expect(secondRowColumns.length).toBe(3);
          });

          it('its first column has a image of the pokemon', () => {
            const column = secondRowColumns[0];
            expect(column).toBeTruthy();
            const image: HTMLImageElement = column.querySelector('img');
            expect(image).toBeTruthy();
            expect(image.src).toBe(pokemons[1].imageSrc);
          });

          it('its second column value is "ivysaur"', () => {
            const column = secondRowColumns[1];
            expect(column).toBeTruthy();
            expect(column.textContent).toBe('ivysaur');
          });

          it('its third column has a "View" button', () => {
            const column = secondRowColumns[2];
            expect(column).toBeTruthy();

            const buttons: NodeListOf<
              HTMLButtonElement
            > = column.querySelectorAll('button');
            expect(buttons.length).toBe(2);
            expect(buttons[0].textContent.trim()).toBe('View');
          });

          it('the third column has a "Unfavorite" button', () => {
            const column = secondRowColumns[2];
            expect(column).toBeTruthy();

            const buttons: NodeListOf<
              HTMLButtonElement
            > = column.querySelectorAll('button');
            expect(buttons.length).toBe(2);
            expect(buttons[1].textContent.trim()).toBe('Unfavorite');
          });
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

      it('the table header has 3 columns', () => {
        const headers: HTMLElement[] = fixture.nativeElement.querySelectorAll(
          'table.table > thead > tr > th'
        );
        expect(headers).toBeTruthy();
        expect(headers.length).toBe(3);
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

      it('the table row has one column with colspan 3', () => {
        const col: HTMLTableColElement = fixture.nativeElement.querySelector(
          'table.table > tbody > tr > td'
        );
        expect(col).toBeTruthy();
        expect(col.getAttribute('colspan')).toBe('3');
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
