import React, { ChangeEvent, useState } from 'react';
import style from '../MyPosts.module.scss';
import { WRITE_MESSAGE } from '../../../../../constants';
import { AddPostFormType } from '../../../types';

export const AddPostForm = ( props: AddPostFormType ) => {

  const [ postText, setPostText ] = useState<string>( '' );
  const [ error, setError ] = useState<boolean>( false );

  const validate = () => {
    postText.trim().length > 1 ? addPost( postText ) : setError( true );
  };

  const addPost = ( postText: string ) => {
    props.addNewPost( postText );
    setPostText( '' );
  };
  const onTextareaChange = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
    setPostText( e.currentTarget.value );
    setError( false );
  };

  return (
    <div className={ style.addPostFormBlock }>
      <div className={ style.fieldContainer }>
                <textarea
                  value={ postText }
                  placeholder={ WRITE_MESSAGE }
                  className={ !error ? style.textField : style.errorField }
                  onChange={ onTextareaChange }
                />
        { error && <span>Min length is 2 symbols</span> }
      </div>
      <button onClick={ validate }>Add post</button>
    </div>
  );
};
