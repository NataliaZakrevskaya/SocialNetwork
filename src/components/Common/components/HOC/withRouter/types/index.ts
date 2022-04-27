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