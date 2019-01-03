import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { layoutModuleImports } from '../layout.module';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutFeatureState } from '../layout.reducer';
import { LayoutActionTypes, PushMessage } from '../layout.actions';
import { filter, take } from 'rxjs/operators';
import { LayoutEffects } from '../layout.effects';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let store: Store<LayoutFeatureState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ...layoutModuleImports
      ],
      declarations: [MessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('with initial state, should not exist any "span.message" element', () => {
    const messages: HTMLSpanElement[] = fixture.nativeElement.querySelectorAll(
      '.messages span.message'
    );
    expect(messages).toBeTruthy();
    expect(messages.length).toBe(0);
  });

  describe(`when "${
    LayoutActionTypes.PushMessage
  }" action is dispatched`, () => {
    beforeEach(() => {
      LayoutEffects.delayTime = 1000;
      store.dispatch(PushMessage.success('Message A'));
    });

    it('should exist a "span.message" element with "Message A" content', done => {
      component.messages$
        .pipe(
          filter(messages => !!messages.length),
          take(1)
        )
        .subscribe(messages => {
          try {
            fixture.detectChanges();

            expect(messages).toBeTruthy();
            expect(messages.length).toBe(1);
            expect(messages[0].type).toBe('success');
            expect(messages[0].message).toBe('Message A');

            const messageEls: HTMLSpanElement[] = fixture.nativeElement.querySelectorAll(
              '.messages span.message'
            );
            expect(messageEls).toBeTruthy();
            expect(messageEls.length).toBe(1);
            expect(messageEls[0].textContent).toBe('Message A');
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    it('after "LayoutEffects.delayTime" milliseconds, should not exist any "span.message" element', done => {
      setTimeout(() => {
        try {
          fixture.detectChanges();
          const messages: HTMLSpanElement[] = fixture.nativeElement.querySelectorAll(
            '.messages span.message'
          );
          expect(messages).toBeTruthy();
          expect(messages.length).toBe(0);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, LayoutEffects.delayTime + 200);
    });
  });
});
