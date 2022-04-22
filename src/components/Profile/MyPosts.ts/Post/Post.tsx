import React, {useState} from 'react';
import {useSelector} from "react-redux";
import s from "./Post.module.css"
import {PostsType, ProfileType} from "../../../../Redux/Reducers/profile-reducer";
import {AppStateType} from "../../../../Redux/redux-store";
import profileImage from "../../../../Images/flat-face-icon-23.png";


const Post = (props: PostsType) => {

    const [likesCount, setLikesCount] = useState<number>(props.likesCount)
    const [isLiked, setIsLiked] = useState<boolean>(false)

    const profile = useSelector<AppStateType, ProfileType>(state => state.profilePage.profile)

    const like = () => {
        !isLiked ?  setLikesCount(likesCount + 1) : setLikesCount(likesCount - 1)
        setIsLiked(!isLiked)
    }

    return (
        <div key={props.id} className={s.itemBlock}>
            <div className={s.item}>
                <div className={s.userInfoContainer}>
                    <img
                        src={profile?.photos.large !== null ? profile?.photos.large : profileImage}
                        alt={"img"}/>
                    <span>{profile?.fullName}</span>
                </div>
                <div className={s.messageContainer}>
                {props.message}
                </div>
                <div className={`${s.likesContainer} ${isLiked ? s.likeIsActive : ''}`}>
                    <span onClick={like}>{isLiked ? '❤️' : '💙' }</span>
                    <span>{likesCount}</span>
                </div>
            </div>

        </div>
    )
}

export default Post;