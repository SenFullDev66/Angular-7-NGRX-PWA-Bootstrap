import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { LayoutState, layoutReducer } from '../layout/layout.reducer';

export interface State {
  layout: LayoutState;
}

export const reducers: ActionReducerMap<State> = {
  layout: layoutReducer
};


export const layoutSelector = createFeatureSelector<State, LayoutState>('layout');

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
