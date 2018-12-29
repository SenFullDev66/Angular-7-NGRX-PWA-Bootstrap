import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LayoutFeatureState } from '../layout.reducer';
import { ChangeTitle } from '../layout.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  constructor(private store: Store<LayoutFeatureState>) {}

  @Input()
  title: Observable<string> | string;
  loading = true;
  mounted = true;

  ngOnInit() {
    if (typeof this.title === 'string') {
      this.loading = false;
      this.store.dispatch(new ChangeTitle(this.title));
    } else {
      this.loading = true;
      this.title.pipe(takeWhile(() => this.mounted)).subscribe(title => {
        this.loading = false;
        this.store.dispatch(new ChangeTitle(title));
      });
    }
  }

  ngOnDestroy() {
    this.mounted = false;
  }
}
