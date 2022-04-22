import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post/Post";
import {AppStateType} from "../../../Redux/redux-store";
import {ProfileInitialStateType, profileReducerActions} from "../../../Redux/Reducers/profile-reducer";
import {AddPostForm} from "./AddPostForm/AddPostForm";
import commonStyle from "./../Profile.module.scss";
import s from "./MyPosts.module.scss";

const MyPosts = React.memo(() => {

    const dispatch = useDispatch()
    const profilePage = useSelector<AppStateType, ProfileInitialStateType>(state => state.profilePage)


    const postsElements =
        profilePage.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>);

    const addNewPost = (newPostText: string) => {
        dispatch(profileReducerActions.addPost(newPostText))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <hr className={commonStyle.hr}/>
            <AddPostForm addNewPost={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})


export default MyPosts;