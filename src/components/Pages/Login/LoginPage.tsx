import React from 'react';
import {reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {login} from "../../../Redux/Reducers/auth-reducer";
import {LoginForm} from "./LoginForm";
import style from "./loginPage.module.scss";
import {PROFILE} from "../../../constants";
import {FormDataType, LoginFormPropsType} from "../types";

const LoginPage: React.FC = () => {

    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={PROFILE}/>
    }

    return (
        <div className={style.loginPage}>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}
            />
        </div>
    );
};

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({form: "Login"})(LoginForm)

export default LoginPage;
