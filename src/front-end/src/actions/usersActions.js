import { createAction } from 'redux-actions';

export const SET_USERS = 'SET_USERS';
export const REMOVE_USERS = 'REMOVE_USERS';

export function setUsers(users) {
    return createAction(SET_USERS)({ users });
}

export function removeUsers(userId) {
    return createAction(REMOVE_USERS)({ userId });
}
