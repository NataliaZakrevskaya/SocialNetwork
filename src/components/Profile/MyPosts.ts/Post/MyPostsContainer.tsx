import React, {ChangeEvent} from 'react';
import {addPostActionCreator, onPostChangeActionCreator} from "../../../../Redux/profile-reducer";
import {StoreType} from "../../../../Redux/store";
import MyPosts from "../MyPosts";
import StoreContext from "../../../../StoreContext";

/*type MyPostsPropsType = {
    store: StoreType
}*/

const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                const state = store.getState();

                const addPost = () => {
                    store.dispatch(addPostActionCreator());
                }
                const onPostChange = (text: string) => {
                    store.dispatch(onPostChangeActionCreator(text))
                }
       return  <MyPosts
            newPostText={onPostChange}
            addPost={addPost}
            posts={state.profilePage.posts}
        />
            }}
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;