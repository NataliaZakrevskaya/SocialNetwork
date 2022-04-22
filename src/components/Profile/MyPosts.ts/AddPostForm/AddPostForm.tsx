import React, {ChangeEvent, useState} from "react";
import s from "../MyPosts.module.scss"


export const AddPostForm = (props: AddPostFormType) => {

    const [postText, setPostText] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const validate = () => {
        {
            postText.trim().length > 1 ? addPost(postText) : setError(true)
        }
    }

 const addPost = (postText: string) => {
     props.addNewPost(postText)
     setPostText('')
 }
const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.currentTarget.value)
    setError(false)
}

    return (
        <div className={s.addPostFormBlock}>
            <div className={s.fieldContainer}>
                <textarea
                    value={postText}
                    placeholder={"Write your message..."}
                    className={!error ? s.textField : s.errorField }
                    onChange={onChangeHandler}
                />
            {error && <span>Min length is 2 symbols</span>}
            </div>
                <button onClick={validate}>Add post</button>
        </div>
    )
}


// TYPES
export type AddPostFormType = {
    addNewPost: (newPostText: string) => void
}