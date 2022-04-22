import {useLocation, useParams} from "react-router-dom";
import React from "react";

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

// TYPES
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
export type InjectedProps = {
    userId: string
}