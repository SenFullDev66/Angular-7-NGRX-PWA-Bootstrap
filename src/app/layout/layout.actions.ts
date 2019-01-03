import { Action } from '@ngrx/store';
import { Severity } from './layout';

export enum LayoutActionTypes {
  PushMessage = '[Layout] Push message',
  ChangeTitle = '[Layout] Change title',
  TitleChanged = '[Layout] Title changed'
}

export class ChangeTitle implements Action {
  readonly type = LayoutActionTypes.ChangeTitle;

  constructor(public title: string) {}
}

export class TitleChanged implements Action {
  readonly type = LayoutActionTypes.TitleChanged;

  constructor(public title: string) {}
}

export class PushMessage implements Action {
  readonly type = LayoutActionTypes.PushMessage;

  constructor(public severity: Severity, public message: string) {}

  static info(message: string) {
    return new PushMessage(Severity.INFO, message);
  }
  static success(message: string) {
    return new PushMessage(Severity.SUCCESS, message);
  }
  static warning(message: string) {
    return new PushMessage(Severity.WARNING, message);
  }
  static danger(message: string) {
    return new PushMessage(Severity.DANGER, message);
  }
}

export type LayoutActions = ChangeTitle | PushMessage;
