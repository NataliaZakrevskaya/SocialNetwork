import {usersAPI} from "../../API/usersAPI";
import {FollowingResponseType} from "../../API/types";
import {ResultCodesEnum} from "../../enums";
import {follow, unfollow} from "../Thunk/usersThunk/usersThunk";
import {usersReducerActions} from "../Reducers/usersReducer/usersReducer";

jest.mock('../API/users-API')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  usersAPIMock.follow.mockClear()
  usersAPIMock.unfollow.mockClear()
})

const result: FollowingResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
}

test("Success follow thunk", async () => {

  usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

  const thunk = follow(1)
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersReducerActions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersReducerActions.followSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersReducerActions.toggleFollowingProgress(false, 1))
})
test("Success unfollow thunk", async () => {

  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

  const thunk = unfollow(1)
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersReducerActions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersReducerActions.unfollowSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersReducerActions.toggleFollowingProgress(false, 1))
})
