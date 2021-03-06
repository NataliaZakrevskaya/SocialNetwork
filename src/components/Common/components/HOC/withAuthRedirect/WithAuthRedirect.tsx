import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MapStateToPropsType } from './types';
import { LOGIN } from '../../../../../constants';
import { AppStateType } from '../../../../../Redux/types';

const mapStateToPropsForRedirect = ( state: AppStateType ): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export function WithAuthRedirect<T>( WrappedComponent: React.ComponentType<T> ) {
  const RedirectComponent = ( props: MapStateToPropsType ) => {

    const { isAuth, ...restProps } = props;

    if ( !isAuth ) {
      return <Navigate to={ LOGIN }/>;
    }
    return <WrappedComponent { ...restProps as T }/>;
  };
  return connect( mapStateToPropsForRedirect )( RedirectComponent );
}

