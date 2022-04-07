import usersReducer, {InitialStateType, usersReducerActions, UsersType} from "../Redux/users-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        users: [
            {
                id: 0, status: "status 0", name: "Natasha 0", followed: false, uniqueUrlName: null, photos: {
                    small: null, large: null
                }
            },
            {
                id: 1, status: "status 1", name: "Natasha 1", followed: false, uniqueUrlName: null, photos: {
                    small: null, large: null
                }
            },
            {
                id: 2, status: "status 2", name: "Natasha 2", followed: true, uniqueUrlName: null, photos: {
                    small: null, large: null
                }
            },
            {
                id: 3, status: "status 3", name: "Natasha 3", followed: true, uniqueUrlName: null, photos: {
                    small: null, large: null
                }
            },
        ] as UsersType[],
        pageSize: 10,
        totalUsersCount: 0,
        page: 1,
        isFetching: false,
        followingInProgress: [] as number[],
        filter: {term: '', friend: null},
    }
})


test('Current user should be followed', () => {

    const endState = usersReducer(startState, usersReducerActions.followSuccess(1));

    expect(endState.users[0].followed).toBeFalsy();
    expect(endState.users[1].followed).toBeTruthy();
})
test('Current user should be unfollowed', () => {

    const endState = usersReducer(startState, usersReducerActions.unfollowSuccess(3));

    expect(endState.users[2].followed).toBeTruthy();
    expect(endState.users[3].followed).toBeFalsy();
})
