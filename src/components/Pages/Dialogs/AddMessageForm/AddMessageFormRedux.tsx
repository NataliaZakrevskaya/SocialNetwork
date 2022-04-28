import React from "react";
import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Textarea} from "../../../Common/Components/FormsControls/FormsControls";
import style from "../Dialogs.module.scss";
import {DialogFormDataType} from "../../types";
import {WRITE_MESSAGE} from "../../../../constants";

export const AddMessageForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
  const onFormSubmit = (values: any) => {
    props.handleSubmit(values)
    props.reset()
  }

  return (
    <form onSubmit={onFormSubmit} className={style.addMessageForm}>
      <Field
        component={Textarea}
        name={"newMessageBody"}
        placeholder={WRITE_MESSAGE}
        className={style.textField}
      />
      <button>Send</button>
    </form>
  )
}

export const AddMessageFormRedux = reduxForm<DialogFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm);
