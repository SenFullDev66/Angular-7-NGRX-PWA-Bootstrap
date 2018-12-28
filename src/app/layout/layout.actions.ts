import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
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

export type LayoutActions = ChangeTitle;
