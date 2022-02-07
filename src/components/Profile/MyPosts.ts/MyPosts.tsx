import React from 'react';
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {AddPostFormRedux, AddPostFormType} from "./AddPostFormRedux";
import {MyPostsPropsType} from "./Post/MyPostsContainer";

const MyPosts = (props: MyPostsPropsType) => {
    const postsElements =
        props.profilePage.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>);

    const addNewPost = (values: AddPostFormType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}


export default MyPosts;