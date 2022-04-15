import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../Utils/Validators/Validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import s from "./MyPosts.module.css"

export type AddPostFormType = {
    newPostText: string
}

//const maxLength10 = maxLengthCreator(10);

export const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => {
    const onSubmit = (values: any) => {
        props.handleSubmit(values)
        props.reset()
    }
    return (
        <form onSubmit={onSubmit} className={s.addPostFormBlock}>
            <div className={s.fieldContainer}>
                <Field
                    component={Textarea}
                    name={"newPostText"}
                    placeholder={"Write your message..."}
                    //validate={[required, maxLength10]}
                    className={s.textField}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostFormRedux = reduxForm<AddPostFormType>({form: "profileAddPostForm"})(AddPostForm)
