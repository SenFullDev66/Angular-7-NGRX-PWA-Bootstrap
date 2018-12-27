import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  ChangeTitle = '[Layout] Change Title'
}

export class ChangeTitle implements Action {
  readonly type = LayoutActionTypes.ChangeTitle;

  constructor(public title: string) { }
}

export type LayoutActions = ChangeTitle;
