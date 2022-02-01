import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../Redux/redux-store';
import {
    followSuccess,
    getUsers,
    InitialStateType,
    setCurrentPage,
    toggleFollowingProgress,
    unfollowSuccess
} from "../../Redux/users-reducer";
import {Preloader} from "../Common/Preloader/Preloader";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

export type UsersType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}
type PropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UsersType>
    setCurrentPage: (pageNumber: number) => void
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
    toggleFollowingProgress: (isFetching: boolean, userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type mapStateType = InitialStateType;
type mapDispatchType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (currentPage: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
};

const UsersContainer = (props: PropsType) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)

        const onPageChanged = (pageNumber: number) => {
            props.getUsers(pageNumber, props.pageSize)
        }
    }, [])

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <>
        {props.isFetching ? <Preloader/> : null}

        <Users totalUsersCount={props.totalUsersCount}
               pageSize={props.pageSize}
               currentPage={props.currentPage}
               onPageChanged={onPageChanged}
               users={props.users}
               unfollow={props.unfollow}
               follow={props.follow}
               followingInProgress={props.followingInProgress}
        />
    </>
}

const mapStateToProps = (state: AppStateType): mapStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: true,
        followingInProgress: state.usersPage.followingInProgress

    }
}

export default compose(
    WithAuthRedirect,
    connect(mapStateToProps,
        {followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, getUsers})
)(UsersContainer);


/*class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return <>
            {this.props.isFetching ?
                <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
            />
        </>
    }
}*/

/*const mapDispatchToProps = (dispatch: Dispatch): mapDispatchType => {
    return {
        follow: (userID: number) => {
            dispatch(follow(userID))
        },
        unfollow: (userID: number) => {
            dispatch(unfollow(userID))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsers(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPage(currentPage))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCount(totalUsersCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetching(isFetching))
        }
    }
}*/