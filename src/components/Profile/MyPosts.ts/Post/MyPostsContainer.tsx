import {addPost, InitialStateType} from "../../../../Redux/profile-reducer";
import MyPosts from "../MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    profilePage: InitialStateType
};
type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
};

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPost(newPostText))
        }
    }
}

export let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
