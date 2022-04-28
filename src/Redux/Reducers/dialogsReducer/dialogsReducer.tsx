import { v1 } from 'uuid';
import { DialogReducerEnum } from './enums';
import { DialogsInitialStateType, DialogsReducerActionType } from './types';

let initialState: DialogsInitialStateType = {
  dialogs: [
    {
      id: 1,
      name: 'Alex',
      avatar: 'https://imageio.forbes.com/specials-images/imageserve/5f64397931669e167fc57eaf/960x0.jpg?fit=bounds&format=jpg&width=960',
    },
    {
      id: 2,
      name: 'Andrey',
      avatar: 'https://img.freepik.com/free-photo/attractive-mixed-race-male-with-positive-smile-shows-white-teeth-keeps-hands-stomach-being-high-spirit-wears-white-shirt-rejoices-positive-moments-life-people-emotions-concept_273609-15527.jpg?size=626&ext=jpg',
    },
    { id: 3, name: 'Sara', avatar: 'https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg' },
    { id: 4, name: 'Sasha', avatar: 'https://i.insider.com/5cf1200a11e2052506753045?width=700' },
    {
      id: 5,
      name: 'Viktor',
      avatar: 'https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/03/28/Local-Politics/Images/Supreme_Court_Gorsuch_Moments_22084-70c71-0668.jpg?t=20170517',
    },
    {
      id: 6,
      name: 'Valera',
      avatar: 'https://coda.newjobs.com/api/imagesproxy/ms/cms/content30/images/art-jobsA.jpg',
    },
  ],
  messages: {
    [ 1 ]: [
      { id: v1(), message: 'Hello', isAuth: false },
      { id: v1(), message: 'Have you seen my new video?', isAuth: false },
      { id: v1(), message: 'If not, I can send you a link', isAuth: false },
      { id: v1(), message: 'So you wouldn’t look', isAuth: false },
      { id: v1(), message: 'Let me know', isAuth: false },
    ],
    [ 2 ]: [
      { id: v1(), message: 'Hi', isAuth: false },
      { id: v1(), message: 'I’ve made changes to our project', isAuth: false },
      { id: v1(), message: 'And broke something', isAuth: false },
      { id: v1(), message: 'Can you take a look?', isAuth: false },
      { id: v1(), message: 'I don’t understand what’s wrong', isAuth: false },
    ],
    [ 3 ]: [
      { id: v1(), message: 'Hello', isAuth: false },
      { id: v1(), message: 'I have a few questions for you', isAuth: false },
      { id: v1(), message: 'Let me know when you’re free', isAuth: false },
    ],
    [ 4 ]: [
      { id: v1(), message: 'What\'s up ', isAuth: false },
      { id: v1(), message: 'We decided to meet the guys on Friday', isAuth: false },
      { id: v1(), message: 'Are you with us?', isAuth: false },
    ],
    [ 5 ]: [
      { id: v1(), message: 'Hello', isAuth: false },
      { id: v1(), message: 'I need some help', isAuth: false },
      { id: v1(), message: 'Could you help me, pleeeease?)', isAuth: false },
    ],
    [ 6 ]: [
      { id: v1(), message: 'Good afternoon', isAuth: false },
      { id: v1(), message: 'We’ve considered your candidacy', isAuth: false },
      { id: v1(), message: 'And wanted to make you an offer', isAuth: false },
      { id: v1(), message: 'When it’s convenient for you to call and discuss all the details', isAuth: false },
    ],
  },
};

const dialogsReducer = ( state = initialState, action: DialogsReducerActionType ) => {
  switch ( action.type ) {
    case DialogReducerEnum.SEND_MESSAGE:
      const stateCopy = { ...state };
      const messages = stateCopy.messages[ action.userID ];
      const newMessage = { id: v1(), message: action.newMessageBody, isAuth: true };
      const newMessages = [ ...messages, newMessage ];
      stateCopy.messages[ action.userID ] = newMessages;
      return stateCopy;
    default:
      return state;
  }
};

export const dialogsReducerActions = {
  sendMessage: ( userID: number, newMessageBody: string ) => {
    return {
      type: DialogReducerEnum.SEND_MESSAGE,
      userID,
      newMessageBody,
    } as const;
  },
};

export default dialogsReducer;
