import {AppReducersActions} from "../../Reducers/appReducer/appReducer";
import {getAuthUserData} from "../authThunk/authThunk";

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise])
    .then(() => {
      dispatch(AppReducersActions.initializedSuccess())
    })
}