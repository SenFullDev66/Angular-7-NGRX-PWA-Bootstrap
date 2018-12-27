import { LayoutActionTypes, LayoutActions } from './layout.actions';
import { createSelector } from '@ngrx/store';
import { layoutSelector } from '../reducers';


export interface LayoutState {
  title: string;
}

export const initialState: LayoutState = {
  title: 'E-PokedeX'
};

export function layoutReducer(state = initialState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.ChangeTitle:
      return { title: action.title };
    default:
      return state;
  }
}

export const layoutTitleSelector = createSelector(layoutSelector, state => state.title);
