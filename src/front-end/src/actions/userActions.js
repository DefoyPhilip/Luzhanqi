import { createAction } from 'redux-actions';

export const SET_USER_VALUES = 'SET_USER_VALUES';

export function setUserValues(id, name) {
    return createAction(SET_USER_VALUES)({ id, name });
}