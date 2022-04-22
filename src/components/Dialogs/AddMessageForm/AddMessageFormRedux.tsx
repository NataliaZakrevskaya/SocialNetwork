import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import s from "../Dialogs.module.scss";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../Common/components/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../Utils/Validators/Validators";

type DialogFormDataType = {
    newMessageBody: string
}

//const maxLength50 = maxLengthCreator(50);

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
