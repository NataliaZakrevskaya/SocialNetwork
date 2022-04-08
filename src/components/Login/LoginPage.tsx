import React from 'react';
import {reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {login} from "../../Redux/auth-reducer";
import {LoginForm, LoginFormPropsType} from "./LoginForm";


const LoginPage: React.FC<LoginPropsType> = (props) => {

    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}
            />
        </div>
    );
};

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({form: "Login"})(LoginForm)

export default LoginPage

// TYPES
type LoginPropsType = {}
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
