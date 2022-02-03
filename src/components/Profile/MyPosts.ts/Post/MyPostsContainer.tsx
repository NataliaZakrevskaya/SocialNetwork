import {addPost, InitialStateType, updateNewPostText} from "../../../../Redux/profile-reducer";
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
        profile: null,
        status: state.profilePage.status
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        addPost: () => {
            dispatch(addPost())
        },
        updateNewPostText: (text: string) => {
            let action = updateNewPostText(text);
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;