import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LayoutActionTypes, LayoutActions } from './layout.actions';

export interface LayoutState {
  title: string;
}

export const initialState: LayoutState = {
  title: 'E-PokedeX'
};

export function layoutReducer(
  state = initialState,
  action: LayoutActions
): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.ChangeTitle:
      return { title: action.title };
    default:
      return state;
  }
}

export const layoutSelector = createFeatureSelector<any, LayoutState>('layout');

export const layoutTitleSelector = createSelector(
  layoutSelector,
  state => state.title
);
