import React from "react";
import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Textarea} from "../../Common/components/FormsControls/FormsControls";
import s from "../Dialogs.module.scss";

export const AddMessageForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
    const onSubmit = (values: any) => {
        props.handleSubmit(values)
        props.reset()
    }
    return (
        <form onSubmit={onSubmit} className={s.addMessageForm}>
                <Field
                    component={Textarea}
                    name={"newMessageBody"}
                    placeholder={"Enter your message"}
                   // validate={[required, maxLength50]}
                    className={s.textField}
                />
                <button>Send</button>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<DialogFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

// TYPES
type DialogFormDataType = {
    newMessageBody: string
}