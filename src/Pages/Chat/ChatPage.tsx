import React, {useEffect, useState} from "react";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../Redux/chat-reducer";
import {AppStateType} from "../../Redux/redux-store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

export const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startMessagesListening())
        return () => {dispatch(stopMessagesListening())}

    }, [])

    return (
        <div>
            <Messages />
            <AddChatMessageForm/>
        </div>
    )
}


export const Messages: React.FC = () => {

    const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.chat.messages)

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => <ChatMessage key={index} message={m}/>)}
        </div>
    )
}

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo} width={'30px'} alt={'user image'}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

export const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()



    const sendMessageHandler = () => {
        if (!message) return
       dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button
                    disabled={false}
                    onClick={sendMessageHandler}
                >Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage;