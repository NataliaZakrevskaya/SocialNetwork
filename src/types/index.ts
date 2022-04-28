import {AppMapDispatchToPropsType, AppMapStateToPropsType} from "../MainApp";

export type Nullable<T> = T | null;

export type AppPropsType = AppMapStateToPropsType & AppMapDispatchToPropsType