import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Field, reduxForm} from "redux-form";

export type AddPostFormType = {
    newPostText: string
}

export const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={"textarea"}
                    name={"newPostText"}
                    placeholder={"Write your message"}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostFormRedux = reduxForm<AddPostFormType>({form: "profileAddPostForm"})(AddPostForm)
