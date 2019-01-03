import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LayoutFeatureState, layoutMessagesSelector } from '../layout.reducer';
import { Message } from '../layout';
import { CloseMessage } from '../layout.actions';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor(private store$: Store<LayoutFeatureState>) {}

  messages$: Observable<Message[]>;

  ngOnInit() {
    this.messages$ = this.store$.pipe(select(layoutMessagesSelector));
  }

  close(message: Message) {
    this.store$.dispatch(new CloseMessage(message));
  }
}
