import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post/Post";
import {AppStateType} from "../../../../Redux/reduxStore";
import {ProfileInitialStateType, profileReducerActions} from "../../../../Redux/Reducers/profileReducer/profileReducer";
import {AddPostForm} from "./AddPostForm/AddPostForm";
import commonStyle from "../Profile.module.scss";
import style from "./MyPosts.module.scss";

const MyPosts = memo(() => {

  const dispatch = useDispatch()
  const profilePage = useSelector<AppStateType, ProfileInitialStateType>(state => state.profilePage)

  const postsElements =
    profilePage.posts.map(post => <Post key={post.id} id={post.id} message={post.message}
                                        likesCount={post.likesCount}/>);

  const addNewPost = (newPostText: string) => {
    dispatch(profileReducerActions.addPost(newPostText))
  }

  return (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      <hr className={commonStyle.hr}/>
      <AddPostForm addNewPost={addNewPost}/>
      <div className={style.posts}>
        {postsElements}
      </div>
    </div>
  )
});

export default MyPosts;