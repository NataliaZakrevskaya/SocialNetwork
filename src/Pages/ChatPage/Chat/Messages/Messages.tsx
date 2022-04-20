import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import {ChatMessageType} from "../../../../Redux/chat-reducer";
import {ChatMessage} from "./ChatMessage";
import s from "./../../ChatPage.module.css";

export const Messages: React.FC = () => {

    const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(false)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
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
        <div className={s.messagesPart} style={{overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <ChatMessage key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
