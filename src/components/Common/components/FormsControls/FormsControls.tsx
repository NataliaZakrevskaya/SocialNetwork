import React from "react";
import {Field} from "redux-form";
import s from "./FormsControls.module.css"


const FormControl = ({meta: {touched, error}, children}: any) => {
    const hasError = touched && error;
    const styleError = hasError ? s.error : ""

    return (
        <div className={s.formControl + " " + styleError}>
            <div>
                {children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input = (props: any) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder: string | null, name: string, validators: any[], component: any, props = {}, text = "") => {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                component={component}
                validate={validators}
                {...props}
            /> {text}
        </div>
    )
}
