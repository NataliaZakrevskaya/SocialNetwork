import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Paginator} from "../../Common/Components/Paginator/Paginator";
import {User} from "./User/User";
import {UsersSearchForm} from "./UsersSearchForm/UsersSearchForm";
import {
  getFollowingInProgress, getIsFetching,
  getPage,
  getPageSize,
  getTotalUsersCount, getUsers,
  getUsersFilter
} from "../../../Redux/Selectors/usersSelectors/usersSelectors";
import {Preloader} from "../../Common/Components/Preloader/Preloader";
import style from "./Users.module.scss";
import {queryParamsType} from "../types";
import {follow, requestUsers, unfollow} from "../../../Redux/Thunk/usersThunk/usersThunk";
import {FilterType} from "../../../Redux/Reducers/usersReducer/types";


export const Users: FC = React.memo(() => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const parsedPage = searchParams.get('page')
  const parsedTerm = searchParams.get('term')
  const parsedFriend = searchParams.get('friend')

  const isFetching = useSelector(getIsFetching)
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getPage)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)


  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const onFollow = (userID: number) => {
    dispatch(follow(userID))
  }
  const onUnfollow = (userID: number) => {
    dispatch(unfollow(userID))
  }

  useEffect(() => {
    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsedPage) actualPage = Number(parsedPage)
    if (!!parsedTerm) actualFilter = {...actualFilter, term: parsedTerm as string}
    switch (parsedFriend) {
      case "null" :
        actualFilter = {...actualFilter, friend: null}
        break
      case "true" :
        actualFilter = {...actualFilter, friend: true}
        break
      case "false" :
        actualFilter = {...actualFilter, friend: false}
        break
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query = {} as queryParamsType

    if (!!parsedTerm) query.term = parsedTerm
    if (currentPage !== 1) query.page = String(currentPage)
    if (parsedFriend !== null) query.friend = String(parsedFriend)

    navigate(`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
  }, [filter, currentPage])


  return (
    <div className={style.usersPage}>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      {isFetching
        ? (<Preloader/>)
        : (<div className={style.usersContainer}>
            <div className={style.users}>
              {users.map(user => <User user={user}
                                    unfollow={onUnfollow}
                                    follow={onFollow}
                                    followingInProgress={followingInProgress}
                                    key={user.id}
                />
              )}
            </div>
          </div>
        )
      }
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={10}
      />
    </div>
  )
})
