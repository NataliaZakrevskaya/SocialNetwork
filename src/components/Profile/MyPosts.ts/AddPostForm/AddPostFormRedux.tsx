import React from "react";
import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {minLengthCreator, required} from "../../../../Utils/Validators/Validators";
import {Textarea} from "../../../Common/components/FormsControls/FormsControls";
import s from "../MyPosts.module.scss"

const minLength5 = minLengthCreator(5);

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
                    validate={[required, minLength5]}
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

// TYPES
export type AddPostFormType = {
    newPostText: string
}