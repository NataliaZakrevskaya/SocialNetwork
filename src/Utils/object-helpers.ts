import {newObjectPropsType} from "./types";

export const updateObjectInArray = (items: any[], itemId: number, objectPropName: string, newObjectProps: newObjectPropsType) => {
  return items.map(u => {
    if (u[objectPropName] === itemId) {
      return {...u, ...newObjectProps}
    }
    return u;
  })
}
