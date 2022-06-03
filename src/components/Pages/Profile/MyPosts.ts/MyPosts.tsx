import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import { profileReducerActions } from '../../../../Redux/Reducers/profileReducer/profileReducer';
import { AddPostForm } from './AddPostForm/AddPostForm';
import commonStyle from '../Profile.module.scss';
import style from './MyPosts.module.scss';
import { PostsType } from '../../../../Redux/Reducers/profileReducer/types';
import { getProfilePage } from '../../../../Redux/Selectors/profileSelectors/profileSelectors';

const MyPosts = memo( () => {

  const dispatch = useDispatch();

  const profilePage = useSelector( getProfilePage );

  const postsElements =
    profilePage.posts.map( ( post: PostsType ) => <Post key={ post.id } id={ post.id } message={ post.message }
                                                        likesCount={ post.likesCount }/> );

  const addNewPost = ( newPostText: string ) => {
    dispatch( profileReducerActions.addPost( newPostText ) );
  };

  return (
    <div className={ style.postsBlock }>
      <h3>My posts</h3>
      <hr className={ commonStyle.hr }/>
      <AddPostForm addNewPost={ addNewPost }/>
      <div className={ style.posts }>
        { postsElements }
      </div>
    </div>
  );
} );

export default MyPosts;