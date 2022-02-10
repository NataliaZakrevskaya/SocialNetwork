import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import s from "./../Common/FormsControls/FormsControls.module.css"
import {required} from "../../Utils/Validators/Validators";
import {Input} from "../Common/FormsControls/FormsControls";

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

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Email"}
                    name={"email"}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    placeholder={"Password"}
                    name={"password"}
                    type={"password"}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    component={"input"}
                    name={"rememberMe"}
                    type="checkbox"
                /> Remember me
            </div>
            {
                props.error &&
                <div className={s.formSummaryError}>{props.error}</div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<FormDataType>({form: "Login"})(LoginForm)