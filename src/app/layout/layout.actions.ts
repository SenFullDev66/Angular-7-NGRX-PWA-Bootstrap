import { Action } from '@ngrx/store';

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

  constructor(public severity: string, public message: string) {}

  static success(message: string) {
    return new PushMessage('success', message);
  }
  static alert(message: string) {
    return new PushMessage('alert', message);
  }
  static error(message: string) {
    return new PushMessage('error', message);
  }
}

export type LayoutActions = ChangeTitle;
