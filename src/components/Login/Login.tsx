import React from "react";
import {Field, reduxForm} from "redux-form";

export const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                <Field placeholder={"Login"} name={"Login"} component={"input"}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"Password"} component={"input"}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"RememberMe"} component={"input"}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


export const Login = (props: any) => {
    const onSubmit = (formData: any) => {
        console.log(formData);
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}