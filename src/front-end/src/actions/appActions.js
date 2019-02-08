import { createAction } from 'redux-actions';

export const SET_MESSAGES = 'SET_MESSAGES';

export function addMessage(message, lvl = 'user') {
    return createAction(SET_MESSAGES)({ message, lvl });
}