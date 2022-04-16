import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {AddPostFormRedux, AddPostFormType} from "./Post/AddPostFormRedux/AddPostFormRedux";
import {AppStateType} from "../../../Redux/redux-store";
import {ProfileInitialStateType, profileReducerActions} from "../../../Redux/profile-reducer";

const MyPosts = React.memo(() => {

    const dispatch = useDispatch()
    const profilePage = useSelector<AppStateType, ProfileInitialStateType>(state => state.profilePage)


    const postsElements =
        profilePage.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>);

    const addNewPost = (values: AddPostFormType) => {
        dispatch(profileReducerActions.addPost(values.newPostText))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <hr className={s.hr}/>
            <AddPostFormRedux onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})


export default MyPosts;