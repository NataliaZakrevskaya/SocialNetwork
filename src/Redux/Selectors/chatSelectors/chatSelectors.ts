import { AppStateType } from '../../types';
import { StatusType } from '../../../API/chatAPI';
import { ChatMessageType } from '../../Reducers/chatReducer/types';

export const getStatus = ( state: AppStateType ): StatusType => {
  return state.chat.status;
};
export const getMessages = ( state: AppStateType ): ChatMessageType[] => {
  return state.chat.messages;
};