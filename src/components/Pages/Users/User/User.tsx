import React from 'react'
import {NavLink} from "react-router-dom";
import {UsersType} from "../../../../Redux/Reducers/users-reducer";
//@ts-ignore
import userPhoto from "../../../../Images/flat-face-icon-23.png";
//@ts-ignore
import s from "./User.module.scss";

export const User = ({user, followingInProgress, unfollow, follow}: UsersPropsType) => {

    return (
        <div className={s.user}>
            <div className={s.userInfo}>
                <NavLink to={'/profile/' + user.id}>
                    <img
                        src={user.photos.small !== null ? user.photos.small : userPhoto}
                        alt={"userPhoto"}
                    />
                </NavLink>
                <span className={s.userName}>{user.name}</span>
                <span className={s.userStatus}>{user.status}</span>
            </div>
            <>
                {
                    user.followed
                        ? (<button
                            className={s.unFollowBtn}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }}>
                            unfollow
                        </button>)

                        : (<button
                            className={s.followBtn}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}>
                            follow
                        </button>)
                }
            </>
        </div>
    )
}

// TYPES
type UsersPropsType = {
    user: UsersType
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
}