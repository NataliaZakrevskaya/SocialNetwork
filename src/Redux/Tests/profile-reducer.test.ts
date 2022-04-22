import profileReducer, {PostsType, profileReducerActions, ProfileType} from "../Reducers/profile-reducer";

const startState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 23}
    ] as Array<PostsType>,
    profile: null as ProfileType,
    status: 'hello'
};

test('Post message should be corrected after adding new post', () => {

    const endState = profileReducer(startState, profileReducerActions.addPost('newPostText'));
    expect(endState.posts[2].message).toBe('newPostText');
})
test('Posts length should be corrected after adding new post', () => {

    const endState = profileReducer(startState, profileReducerActions.addPost('newPostText'));
    expect(endState.posts.length).toBe(3);
})
test('Likes count in new post should be zero', () => {

    const endState = profileReducer(startState, profileReducerActions.addPost('newPostText'));
    expect(endState.posts[2].likesCount).toBe(0);
})
test('Status should be changed', () => {

    const endState = profileReducer(startState, profileReducerActions.setStatus('newStatus'));
    expect(endState.status).toBe('newStatus');
})