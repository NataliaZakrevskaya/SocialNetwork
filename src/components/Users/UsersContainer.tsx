import React, {ComponentType} from 'react'
import {connect} from 'react-redux';
import {compose} from "redux";
import {Users} from './Users';
import {AppStateType} from '../../Redux/redux-store';
import {
    FilterType,
    follow,
    requestUsers,
    unfollow,
    UsersType
} from "../../Redux/users-reducer";
import {Preloader} from "../Common/Preloader/Preloader";
import {
    getFollowingInProgress,
    getIsFetching,
    getPage,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from "../../Redux/Selectors/users-selectors";


class UsersAPIComponent extends React.Component<UsersPropsType> {
    componentDidMount() {
        const {requestUsers, currentPage, pageSize, filter} = this.props
        requestUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {requestUsers, pageSize, filter} = this.props
        requestUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {requestUsers, pageSize} = this.props
        requestUsers(1, pageSize, filter)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}

                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    onFilterChanged={this.onFilterChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
};


export default compose<ComponentType>(
    connect<MapStateToPropsType, mapDispatchToPropsType, UsersPropsType, AppStateType>
    (mapStateToProps,
        {
            follow, unfollow, requestUsers
        }),
)(UsersAPIComponent);


// TYPES
type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<any>
    filter: FilterType
}
type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void

};
type UsersPropsType = mapDispatchToPropsType & MapStateToPropsType

