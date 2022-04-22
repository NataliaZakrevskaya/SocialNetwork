import React from "react";
import {InjectedFormProps} from "redux-form";
import {createField, Input} from "../Common/components/FormsControls/FormsControls";
import {required} from "../../Utils/Validators/Validators";
import s from "../Common/components/FormsControls/FormsControls.module.css";
import style from "./loginPage.module.scss";
import {FormDataType} from "./LoginPage";

export type LoginFormPropsType = {
    captchaUrl: string | null
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = ({
                                                                                                                  handleSubmit,
                                                                                                                  error,
                                                                                                                  captchaUrl
                                                                                                              }) => {
    return (
        <form onSubmit={handleSubmit} className={style.loginBlock}>

            <h1>Social Network</h1>

            {createField("Email", "email", [required], Input, {type: "text"}, "")}
            {createField("Password", "password", [required], Input, {type: "password"}, "")}
            <div className={style.checkbox}>
                {createField (null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}
            </div>

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