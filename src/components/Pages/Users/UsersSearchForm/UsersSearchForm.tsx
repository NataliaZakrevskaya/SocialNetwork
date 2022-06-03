import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { getUsersFilter } from '../../../../Redux/Selectors/usersSelectors/usersSelectors';
import style from './UsersSearchForm.module.scss';
import { FriendFormType, UsersSearchFormPropsType, UsersSearchFormType } from '../../types';
import { FilterType } from '../../../../Redux/Reducers/usersReducer/types';

const usersSearchFormValidate = () => {
  return {};
};

export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = memo( ( props ) => {

  const filter = useSelector( getUsersFilter );

  const submit = ( values: UsersSearchFormType, { setSubmitting }: { setSubmitting: ( isSubmitting: boolean ) => void } ) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true',
    };
    props.onFilterChanged( filter );
    setSubmitting( false );
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={ { term: filter.term, friend: String( filter.friend ) as FriendFormType } }
        validate={ usersSearchFormValidate }
        onSubmit={ submit }
      >
        { ( { isSubmitting } ) => (
          <Form className={ style.formContainer }>
            <Field type="text" name="term" placeholder={ 'Search 🔎' } className={ style.searchInput }/>
            <Field name="friend" as="select" className={ style.select }>
              <option value="null">All</option>
              <option value="true">Followed</option>
              <option value="false">Unfollowed</option>
            </Field>
            <button type="submit" disabled={ isSubmitting }>
              Search
            </button>
          </Form>
        ) }
      </Formik>
    </>
  );
} );
