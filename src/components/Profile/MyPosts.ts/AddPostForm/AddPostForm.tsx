import React, {ChangeEvent, useState} from "react";
import s from "../MyPosts.module.css"


export const AddPostForm = (props: AddPostFormType) => {

    const [postText, setPostText] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const validate = () => {
        {
            postText.length > 1 ? addPost(postText) : setError(true)
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
            {error && <span className={s.errorSpan}>Min length is 2 symbols</span>}
            </div>
            <div>
                <button onClick={validate}>Add post</button>
            </div>
        </div>
    )
}



// TYPES
export type AddPostFormType = {
    addNewPost: (newPostText: string) => void
}