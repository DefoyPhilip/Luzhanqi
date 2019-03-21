import { createAction } from 'redux-actions';

export const SET_MESSAGES = 'SET_MESSAGES';
export const CHANGE_ROOM = 'CHANGE_ROOM';

export function addMessage(message, room, lvl = 'user') {
    return createAction(SET_MESSAGES)({ message, room, lvl });
}

export function changeRoom(room) {
    return createAction(CHANGE_ROOM)({ room });
}