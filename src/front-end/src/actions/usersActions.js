import { createAction } from 'redux-actions';

export const SET_USERS = 'SET_USERS';

export function setUsers(users) {
    return createAction(SET_USERS)({ users });
}