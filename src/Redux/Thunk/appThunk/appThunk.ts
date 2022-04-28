import {getAuthUserData} from "../../Reducers/authReducer/authReducer";
import {AppReducersActions} from "../../Reducers/appReducer/appReducer";

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise])
    .then(() => {
      dispatch(AppReducersActions.initializedSuccess())
    })
}