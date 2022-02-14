import React, {ComponentType} from 'react'
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../Redux/redux-store';
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow,
    UsersType
} from "../../Redux/users-reducer";
import {Preloader} from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getFollowingInProgress,
    getIsFetching,
    getPage,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/Selectors/users-selectors";

type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    page: number
    isFetching: boolean
    followingInProgress: Array<any>
}
type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (currentPage: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    toggleFollowingProgress: (isFetching: boolean, userID: string) => void
};
type UsersPropsType = mapDispatchToPropsType & MapStateToPropsType

class UsersAPIComponent extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.page, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}

                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.page}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

/*const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress

    }
};*/

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        page: getPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};


export default compose<ComponentType>(
    connect
    (mapStateToProps,
        {
            // @ts-ignore
            follow, unfollow,
            setCurrentPage, toggleFollowingProgress, requestUsers
        }),
   // WithAuthRedirect
)(UsersAPIComponent);
