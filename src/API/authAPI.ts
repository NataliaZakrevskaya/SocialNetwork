import { AuthApiResponseType } from './types';
import { instance } from './apiConfig';
import { Nullable } from '../types';
import { LOGIN, ME } from './constants';

export const authAPI = {
  me() {
    return instance.get<AuthApiResponseType<{ id: string, email: string, login: string }>>( ME );
  },
  login( email: string, password: string, rememberMe: boolean = false, captcha: Nullable<string> = null ) {
    return instance.post<AuthApiResponseType<{ userId: number }>>( LOGIN, { email, password, rememberMe, captcha } );
  },
  logout() {
    return instance.delete<AuthApiResponseType<{}>>( LOGIN );
  },
};
