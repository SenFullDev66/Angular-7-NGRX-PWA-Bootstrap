import { Component, OnInit } from '@angular/core';
import {
  layoutTitleSelector,
  LayoutState,
  LayoutFeatureState
} from '../layout.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private store: Store<LayoutFeatureState>) {}

  title: Observable<string>;

  ngOnInit() {
    this.title = this.store.pipe(map(layoutTitleSelector));
  }
}
