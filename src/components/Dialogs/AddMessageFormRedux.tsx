import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import s from "./Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../Utils/Validators/Validators";

type DialogFormDataType = {
    newMessageBody: string
}

//const maxLength50 = maxLengthCreator(50);

export const AddMessageForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
    const onSubmit = (values: any) => {
        // @ts-ignore
        props.handleSubmit(values)
        props.reset()
    }
    return (
        <form onSubmit={onSubmit} className={s.addMessageForm}>
            <div>
                <Field
                    component={Textarea}
                    name={"newMessageBody"}
                    placeholder={"Enter your message"}
                   // validate={[required, maxLength50]}
                    className={s.textField}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<DialogFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)
