import {useLocation, useParams} from "react-router-dom";
import React from "react";

export const withRouter = <T extends object>(WrappedComponent: React.ComponentType<T>) => (props: T) => {
  const params = useParams<'userId'>();
  const location = useLocation();

  return (
    <WrappedComponent
      {...props as T}
      userId={params.userId}
      location={location}
    />
  );
};
