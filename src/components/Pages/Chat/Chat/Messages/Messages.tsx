import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatMessage } from './ChatMessage';
import style from '../../ChatPage.module.scss';
import { getMessages } from '../../../../../Redux/Selectors/chatSelectors/chatSelectors';

export const Messages: React.FC = () => {

  const messages = useSelector( getMessages );

  const messagesAnchorRef = useRef<HTMLDivElement>( null );

  const [ isAutoScroll, setIsAutoScroll ] = useState<boolean>( true );

  useEffect( () => {
    if ( isAutoScroll ) {
      messagesAnchorRef.current?.scrollIntoView( { behavior: 'smooth' } );
    }
  }, [ messages ] );

  const onPageDivScroll = ( e: React.UIEvent<HTMLDivElement, UIEvent> ) => {
    const element = e.currentTarget;
    if ( Math.abs( ( element.scrollHeight - element.scrollTop ) - element.clientHeight ) < 400 ) {
      !isAutoScroll && setIsAutoScroll( true );
    } else {
      isAutoScroll && setIsAutoScroll( false );
    }
  };

  return (
    <div className={ style.messagesPart } style={ { height: '400px', overflowY: 'auto' } } onScroll={ onPageDivScroll }>
      { messages.map( ( message ) => <ChatMessage key={ message.id } message={ message }/> ) }
      <div ref={ messagesAnchorRef }/>
    </div>
  );
};
