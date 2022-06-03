import React from 'react';
import { reduxForm } from 'redux-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from './LoginForm';
import style from './loginPage.module.scss';
import { PROFILE } from '../../../constants';
import { FormDataType, LoginFormPropsType } from '../types';
import { getCaptchaUrl, getIsAuth } from '../../../Redux/Selectors/authSelectors/authSelectors';
import { login } from '../../../Redux/Thunk/authThunk/authThunk';

const LoginPage: React.FC = () => {

  const captchaUrl = useSelector( getCaptchaUrl );
  const isAuth = useSelector( getIsAuth );

  const dispatch = useDispatch();

  const onSubmit = ( formData: FormDataType ) => {
    dispatch( login( formData.email, formData.password, formData.rememberMe, formData.captcha ) );
  };

  if ( isAuth ) {
    return <Navigate to={ PROFILE }/>;
  }

  return (
    <div className={ style.loginPage }>
      <LoginReduxForm
        onSubmit={ onSubmit }
        captchaUrl={ captchaUrl }
      />
    </div>
  );
};

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>( { form: 'Login' } )( LoginForm );

export default LoginPage;
