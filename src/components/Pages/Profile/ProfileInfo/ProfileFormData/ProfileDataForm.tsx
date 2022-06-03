import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Preloader } from '../../../../Common/Components/Preloader/Preloader';
import { createField, Input, Textarea } from '../../../../Common/Components/FormsControls/FormsControls';
import commonStyle from '../../../../Common/Components/FormsControls/FormsControls.module.css';
import style from './ProfileDataForm.module.scss';
import { ProfileDataFormPropsType } from '../../../types';
import { ProfileType } from '../../../../../Redux/Reducers/profileReducer/types';

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ( {
                                                                                                                           handleSubmit,
                                                                                                                           profile,
                                                                                                                           error,
                                                                                                                         } ) => {

  if ( !profile ) {
    return <Preloader/>;
  }

  return (
    <form onSubmit={ handleSubmit } className={ style.editInfo }>

      {
        error &&
          <div className={ commonStyle.formSummaryError }>{ error }</div>
      }

      <b>Full name </b> { createField( 'Full name', 'fullName', [], Input ) }
      <b>My professional skills </b>
      { createField( 'My professional skills', 'lookingForAJobDescription', [], Textarea ) }
      <b>Looking for a job </b> { createField( '', 'lookingForAJob', [], Input, { type: 'checkbox' } ) }
      <>
        <h3>Contacts </h3> { Object.keys( profile.contacts )
        .map( key => {
          return (
            <div key={ key }>
              <b>{ key }</b>
              { createField( key, 'contacts.' + key, [], Input ) }
            </div>
          );
        } ) }
      </>
      <button>save</button>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>( { form: 'edit-profile' } )( ProfileDataForm );

export default ProfileDataReduxForm;
