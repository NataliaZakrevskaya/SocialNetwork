import {InferActionsTypes} from "./redux-store";
import {v1} from "uuid";

//CONSTANTS
export enum DialogReducerEnum {
    SEND_MESSAGE = 'DIALOGS/SEND-MESSAGE'
}


let initialState: InitialStateType = {
    dialogs: [
        {
            id: 1,
            name: "Dimych",
            avatar: 'https://imageio.forbes.com/specials-images/imageserve/5f64397931669e167fc57eaf/960x0.jpg?fit=bounds&format=jpg&width=960'
        },
        {
            id: 2,
            name: "Andrey",
            avatar: 'https://img.freepik.com/free-photo/attractive-mixed-race-male-with-positive-smile-shows-white-teeth-keeps-hands-stomach-being-high-spirit-wears-white-shirt-rejoices-positive-moments-life-people-emotions-concept_273609-15527.jpg?size=626&ext=jpg'
        },
        {id: 3, name: "Sveta", avatar: 'https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg'},
        {id: 4, name: "Sasha", avatar: 'https://i.insider.com/5cf1200a11e2052506753045?width=700'},
        {
            id: 5,
            name: "Viktor",
            avatar: 'https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/03/28/Local-Politics/Images/Supreme_Court_Gorsuch_Moments_22084-70c71-0668.jpg?t=20170517'
        },
        {
            id: 6,
            name: "Valera",
            avatar: 'https://coda.newjobs.com/api/imagesproxy/ms/cms/content30/images/art-jobsA.jpg'
        }
    ],
    messages: {
        [1]: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How is your it-kamasutra?"},
        ],
        [2]: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How how are you?"},
        ],
        [3]: [
            {id: 1, message: "Hello"},
            {id: 2, message: "How it's going?"},
            {id: 3, message: "Maybe yoy need some help?"},
        ],
        [4]: [
            {id: 1, message: "What's up "},
            {id: 2, message: "I've watched your SN"},
            {id: 3, message: "It's cool!)"},
        ],
        [5]: [
            {id: 1, message: "Hello"},
            {id: 2, message: "I need some help"},
            {id: 3, message: "Could you help me?)"},
        ],
        [6]: [
            {id: 1, message: "Hi"},
            {id: 2, message: "We want hire you"},
        ],
    },
}



const dialogsReducer = (state = initialState, action: DialogsReducerActionType) => {
    switch (action.type) {
        case DialogReducerEnum.SEND_MESSAGE:
            const stateCopy = {...state}
            const messages = stateCopy.messages[action.userID]
            const newMessage = {id: 5, message: action.newMessageBody}
            const newMessages = [...messages, newMessage]
            stateCopy.messages[action.userID] = newMessages
            return stateCopy
        default:
            return state;
    }
}



//ACTIONS
export const dialogsReducerActions = {
    sendMessage: (userID: number, newMessageBody: string) => {
        return {
            type: DialogReducerEnum.SEND_MESSAGE,
            userID,
            newMessageBody,
        } as const
    }
}



//TYPES
export type DialogType = {
    id: number
    name: string
    avatar: string
};
export type MessageType = {
    id: number
    message: string
};
export type MessagesType = {
    [key: number]: Array<MessageType>
}
export type InitialStateType = {
    dialogs: Array<DialogType>
    messages: MessagesType
};
type DialogsReducerActionType = InferActionsTypes<typeof dialogsReducerActions>

export default dialogsReducer;
