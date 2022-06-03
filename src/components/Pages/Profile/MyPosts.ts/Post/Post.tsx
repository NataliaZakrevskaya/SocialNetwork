import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './Post.module.scss';
import profileImage from '../../../../../Images/flat-face-icon-23.png';
import { getProfile } from '../../../../../Redux/Selectors/profileSelectors/profileSelectors';
import { PostsType } from '../../../../../Redux/Reducers/profileReducer/types';

const Post = ( props: PostsType ) => {

  const [ likesCount, setLikesCount ] = useState<number>( props.likesCount );
  const [ isLiked, setIsLiked ] = useState<boolean>( false );

  const profile = useSelector( getProfile );

  const like = () => {
    !isLiked ? setLikesCount( likesCount + 1 ) : setLikesCount( likesCount - 1 );
    setIsLiked( !isLiked );
  };

  return (
    <div key={ props.id } className={ style.itemBlock }>
      <div className={ style.item }>
        <div className={ style.userInfoContainer }>
          <img
            src={ profile?.photos.large !== null ? profile?.photos.large : profileImage }
            alt={ 'img' }/>
          <span>{ profile?.fullName }</span>
        </div>
        <div className={ style.messageContainer }>
          { props.message }
        </div>
        <div className={ `${ style.likesContainer } ${ isLiked ? style.likeIsActive : '' }` }>
          <span onClick={ like }>{ isLiked ? '❤️' : '💙' }</span>
          <span>{ likesCount }</span>
        </div>
      </div>
    </div>
  );
};

export default Post;