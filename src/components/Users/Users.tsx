import React, {FC} from 'react'
import {FilterType, UsersType} from "../../Redux/users-reducer";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import s from "./Users.module.css"
import {UsersSearchForm} from "./UsersSearchForm";

export const Users: FC<UsersPropsType> = React.memo(({
                                              totalUsersCount,
                                              pageSize,
                                              currentPage,
                                              onPageChanged,
                                              unfollow,
                                              follow,
                                              followingInProgress,
                                              users,
                                              onFilterChanged,
                                              ...props
                                          }: UsersPropsType) => {

    return (

        <div className={s.usersPage}>

            <UsersSearchForm onFilterChanged={onFilterChanged}/>

            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                portionSize={10}
            />
            <div className={s.usersContainer}>
                <div className={s.users}>
                    {users.map(u => <User user={u}
                                          unfollow={unfollow}
                                          follow={follow}
                                          followingInProgress={followingInProgress}
                                          key={u.id}/>
                    )}
                </div>
            </div>
        </div>
    )
})


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
    onFilterChanged: (filter: FilterType) => void
}
