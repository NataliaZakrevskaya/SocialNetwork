import { FormAction } from 'redux-form';
import { AuthReducerActionType } from '../../../Reducers/authReducer/types';
import { AppThunkType } from '../../../types';

export type AuthThunkType = AppThunkType<AuthReducerActionType | FormAction>