import React from 'react'
import s from "./User.module.css";
import userPhoto from "../../Images/flat-face-icon-23.png";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../Redux/users-reducer";

export const User = ({user, followingInProgress, unfollow, follow}: UsersPropsType) => {

    return (

        <div className={s.user}>

            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={s.userPhoto}
                         alt={"userPhoto"}/>
                </NavLink>
            </div>

            <span>{user.name}</span>
            <span>{user.status}</span>

            <div>
                {
                    user.followed
                        ? <button
                            className={s.unFollowBtn}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                //unfollow(user.id)
                            }}>unFollow</button>

                        : <button
                            className={s.followBtn}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                               // follow(user.id)
                            }}>Follow</button>
                }
            </div>


        </div>
    )
}

//Types
type UsersPropsType = {
    user: UsersType
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
}