import { AppStateType } from '../../types';
import { Nullable } from '../../../types';

export const getIsAuth = ( state: AppStateType ): boolean => {
  return state.auth.isAuth;
};
export const getLogin = ( state: AppStateType ): Nullable<string> => {
  return state.auth.data.login;
};
export const getCaptchaUrl = ( state: AppStateType ): Nullable<string> => {
  return state.auth.captchaUrl;
};