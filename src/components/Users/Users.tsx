import React, {FC, useEffect} from 'react'
import {FilterType, requestUsers, UsersType} from "../../Redux/users-reducer";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import s from "./Users.module.css"
import {UsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getFollowingInProgress,
    getPage,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../Redux/Selectors/users-selectors";

export const Users: FC<UsersPropsType> = React.memo((props) => {


    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getPage)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()



    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userID: number) => {
        dispatch(follow(userID))
    }
    const unfollow = (userID: number) => {
        dispatch(unfollow(userID))
    }

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])


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
}
