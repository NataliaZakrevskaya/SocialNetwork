import {
    addPostActionCreator,
    InitialStateType,
    updateNewPostTextActionCreator
} from "../../../../Redux/profile-reducer";
import MyPosts from "../MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import {Dispatch} from "redux";

type MapStateType = InitialStateType;
type MapDispatchType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
};

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: null
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;