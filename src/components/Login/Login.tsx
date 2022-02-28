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
}

type LoginPropsType = {
    isAuth?: boolean
    login: (email: string, password: string, rememberMe: boolean) => void
}

export const Login = ({isAuth, login, ...restProps}: LoginPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required], Input, {type: "text"}, "")}
            {createField("Password", "password", [required], Input, {type: "password"}, "")}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}

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

const LoginReduxForm = reduxForm<FormDataType>({form: "Login"})(LoginForm)