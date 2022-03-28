import {InferActionsTypes} from "./redux-store";

//CONSTANTS
export enum DialogReducerEnum {
    SEND_MESSAGE = 'DIALOGS/SEND-MESSAGE'
}


let initialState: InitialStateType = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"}
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-kamasutra?"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"}
    ]
}



const dialogsReducer = (state = initialState, action: DialogsReducerActionType) => {
    switch (action.type) {
        case DialogReducerEnum.SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}



//ACTIONS
export const dialogsReducerActions = {
    sendMessage: (newMessageBody: string) => {
        return {
            type: DialogReducerEnum.SEND_MESSAGE,
            newMessageBody
        } as const
    }
}



//TYPES
export type DialogType = {
    id: number
    name: string
};
export type MessageType = {
    id: number
    message: string
};
export type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
};
type DialogsReducerActionType = InferActionsTypes<typeof dialogsReducerActions>

export default dialogsReducer;
