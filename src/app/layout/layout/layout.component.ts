import { Component } from '@angular/core';
import { layoutTitleSelector, LayoutState } from '../layout.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private store: Store<LayoutState>) {
    this.title = store.pipe(map(layoutTitleSelector));
  }

  title: Observable<string>;

}
