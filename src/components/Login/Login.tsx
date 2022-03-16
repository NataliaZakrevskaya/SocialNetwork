import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import s from "./../Common/FormsControls/FormsControls.module.css"
import {required} from "../../Utils/Validators/Validators";
import {createField, Input} from "../Common/FormsControls/FormsControls";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    captchaUrl: string | null
}

type LoginPropsType = {
    isAuth?: boolean
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    captchaUrl: string | null
}

export const Login = ({isAuth, login, captchaUrl, ...restProps}: LoginPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
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

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required], Input, {type: "text"}, "")}
            {createField("Password", "password", [required], Input, {type: "password"}, "")}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}

            {captchaUrl && <img src={captchaUrl} alt={'captchaUrl'}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input)}

            {
                error &&
                <div className={s.formSummaryError}>{error}</div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({form: "Login"})(LoginForm)