import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LayoutActionTypes, LayoutActions } from './layout.actions';
import { Message } from './layout';

export interface LayoutState {
  title: string;
  messages: Message[];
}

export interface LayoutFeatureState {
  layout: LayoutState;
}

export const initialState: LayoutState = {
  title: 'E-PokédeX',
  messages: []
};

export function layoutReducer(
  state = initialState,
  action: LayoutActions
): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.ChangeTitle:
      return { ...state, title: action.title };
    case LayoutActionTypes.PushMessage:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    case LayoutActionTypes.CloseMessage:
      return {
        ...state,
        messages: state.messages.filter(message => action.message !== message)
      };
    default:
      return state;
  }
}

export const layoutSelector = createFeatureSelector<
  LayoutFeatureState,
  LayoutState
>('layout');

export const layoutTitleSelector = createSelector(
  layoutSelector,
  state => state.title
);

export const layoutMessagesSelector = createSelector(
  layoutSelector,
  state => state.messages
);
