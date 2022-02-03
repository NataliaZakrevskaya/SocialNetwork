import {useLocation, useParams} from "react-router-dom";
import React from "react";

export type LocationType = {
    hash: string
    key: string
    pathname: string
    search: string
    state: object | null
}
export type WrappedComponentWithRouterPropsType = {
    userId: string
    location: LocationType
}

export const withRouter = (WrappedComponent: typeof React.Component) => (props: object) => {
    const params = useParams<'userId'>();
    const location = useLocation()


    return (
        <WrappedComponent
            {...props}
            userId={params.userId}
            location={location}
        />
    );
};

export type InjectedProps = {
    userId: string
}

export const withRouter2 = <T extends object>(WrappedComponent: React.ComponentType<T>) => (props: T) => {
    const params = useParams<'userId'>();
    const location = useLocation()


    return (
        <WrappedComponent
            {...props as T}
            userId={params.userId}
            location={location}
        />
    );
};