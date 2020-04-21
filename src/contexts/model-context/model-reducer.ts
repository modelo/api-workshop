import React, { Dispatch } from 'react';
import EventEmitter from '../../utils/event-utils';
import { ModelActions } from './model-action-types';
import modelActions, { modelActionTypes } from './model-actions';

export type ModelState = {
  loadingProgress: number;
};

export type ModelContext = {
  readonly eventEmitter: EventEmitter;
  readonly containerId: string;
  readonly dispatch: Dispatch<any>;
  readonly viewer: any;
  setViewer: (viewer: any) => void;
  state: ModelState;
  actions: typeof modelActions;
};

export const modelInitialState: ModelState = {
  loadingProgress: 0
};

export const modelInitialContext: ModelContext = {
  eventEmitter: new EventEmitter(),
  containerId: '__MODELO_MODEL_VIEWER__',
  viewer: null,
  setViewer: () => {},
  dispatch: {} as any,
  state: modelInitialState,
  actions: modelActions
};

export const modelContext = React.createContext(modelInitialContext);

export const ModelProvider = modelContext.Provider;

export function modelReducer(state: ModelState, action: ModelActions): ModelState {
  switch (action.type) {
    case modelActionTypes.UPDATE_MODEL_LOADING_PROCESS: {
      return {
        ...state,
        loadingProgress: action.payload.progress
      };
    }
  }
  return state;
}
