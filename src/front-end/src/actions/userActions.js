import { createAction } from 'redux-actions';

export const CONNECTED = 'CONNECTED';

export function connectUser(id, name) {
    return createAction(CONNECTED)({ id, name });
}