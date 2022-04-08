import React from "react";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

export const Chat: React.FC = (props) => {
    return (
        <div>
            <Messages/>
            <AddChatMessageForm/>
        </div>
    )
}

export const Messages: React.FC = () => {

    const messages: any = [1, 2, 3, 4]

    return (


        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m: any) => <ChatMessage/>)}
            {messages.map((m: any) => <ChatMessage/>)}
            {messages.map((m: any) => <ChatMessage/>)}
        </div>
    )
}

const ChatMessage: React.FC = () => {
    const message = {
        url: 'https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg',
        author: 'Dimych',
        text: 'Hello, how are you',
    }

    return (
        <div>
            <img src={message.url} width={'30px'} alt={'user image'} /> <b>{message.author}</b>
            {message.text}
            <hr/>

        </div>
    )
}

export const AddChatMessageForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;