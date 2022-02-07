import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import s from "./Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../Utils/Validators/Validators";

type DialogFormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50);

export const AddMessageForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.textInput}>
            <div>
                <Field
                    component={Textarea}
                    name={"newMessageBody"}
                    placeholder={"Enter your message"}
                    validate={[required, maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<DialogFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)
