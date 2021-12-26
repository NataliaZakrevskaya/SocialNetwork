import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostPropsType} from "../../../Redux/store";

type MyPostsPropsType = {
    newPostText: (text: string) => void
    addPost: () => void
    posts: Array<PostPropsType>
}
    const MyPosts = (props: MyPostsPropsType) => {
    const postsElements =
        props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>);
    const addPost = () => {
        props.addPost();
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.newPostText(text);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}


export default MyPosts;