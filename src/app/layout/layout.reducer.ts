import { Action } from '@ngrx/store';
import { LayoutActionTypes, LayoutActions } from './layout.actions';


export interface State {
  title: string;
}

export const initialState: State = {
  title: 'E-PokedeX'
};

export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {
    case LayoutActionTypes.ChangeTitle:
      return { title: action.title };
    default:
      return state;
  }
}
