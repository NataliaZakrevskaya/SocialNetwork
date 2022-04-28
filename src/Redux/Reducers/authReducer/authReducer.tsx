import { AuthReducerEnum } from './enums';
import { AuthDataType, AuthInitialStateType, AuthReducerActionType } from './types';

const initialState: AuthInitialStateType = {
  data: {} as AuthDataType,
  isAuth: false,
  captchaUrl: null, // if null, then captcha isn't required
};

const authReducer = ( state: AuthInitialStateType = initialState, action: AuthReducerActionType ) => {
  switch ( action.type ) {
    case AuthReducerEnum.SET_USER_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          email: action.payload.email,
          login: action.payload.login,
          id: action.payload.id,
        },
        isAuth: action.payload.isAuth,
      };
    case AuthReducerEnum.GET_CAPTCHA_URL_SUCCESS:
      return { ...state, captchaUrl: action.payload.captchaUrl };
    default:
      return state;
  }
};

export const authReducerActions = {
  setAuthUserData: ( id: string, email: string, login: string, isAuth: boolean ) => {
    return {
      type: AuthReducerEnum.SET_USER_DATA,
      payload: { id, email, login, isAuth },
    } as const;
  },
  getCaptchaUrlSuccess: ( captchaUrl: string ) => {
    return {
      type: AuthReducerEnum.GET_CAPTCHA_URL_SUCCESS,
      payload: { captchaUrl },
    } as const;
  },
};

export default authReducer;
