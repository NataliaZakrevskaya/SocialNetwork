import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import {ChatMessageType} from "../../../../Redux/Reducers/chat-reducer";
import {ChatMessage} from "./ChatMessage";
import s from "../../ChatPage.module.scss";

export const Messages: React.FC = () => {

    const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 400) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div className={s.messagesPart} style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <ChatMessage key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}/>
        </div>
    )
}
