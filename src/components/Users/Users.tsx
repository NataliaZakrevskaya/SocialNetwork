import React from 'react'
import {UsersType} from "../../Redux/users-reducer";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";

export const Users = ({
                          totalUsersCount,
                          pageSize,
                          currentPage,
                          onPageChanged,
                          unfollow,
                          follow,
                          followingInProgress,
                          users,
                          ...props
                      }: UsersPropsType) => {

    return (

        <div>
            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                portionSize={10}
            />
            <div>
                {users.map(u => <User user={u}
                                      unfollow={unfollow}
                                      follow={follow}
                                      followingInProgress={followingInProgress}
                                      key={u.id}/>
                )}
            </div>
        </div>
    )
}

//Types
type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
}