import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import s from "./Dialogs.module.css";
import {Field, reduxForm} from "redux-form";

type DialogFormDataType = {
    newMessageBody: string
}

export const AddMessageForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.textInput}>
            <div>
                <Field
                    component={"textarea"}
                    name={"newMessageBody"}
                    placeholder={"Enter your message"}
                />
            </div>
            <div>
                <button
                    //disabled={props.dialogsPage.newMessageBody.trim() === ''}
                >Send
                </button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<DialogFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)
