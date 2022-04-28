import { AppReducerEnum } from './enums';
import { AppInitialStateType, AppReducerActionType } from './types';

const initialState: AppInitialStateType = {
  initialized: false,
};

const appReducer = ( state: AppInitialStateType = initialState, action: AppReducerActionType ) => {
  switch ( action.type ) {
    case AppReducerEnum.INITIALIZED_SUCCESS:
      return { ...state, initialized: true };

    default:
      return state;
  }
};

export const AppReducersActions = {
  initializedSuccess: () => {
    return { type: AppReducerEnum.INITIALIZED_SUCCESS } as const;
  },
};

export default appReducer;
