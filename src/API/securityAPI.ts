import { instance } from './apiConfig';
import { captchaType } from './types';
import { GET_CAPTCHA_URL } from './constants';

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<captchaType>( GET_CAPTCHA_URL )
      .then( res => res.data );
  },
};
