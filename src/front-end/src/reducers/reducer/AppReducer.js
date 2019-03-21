import { SET_MESSAGES, CHANGE_ROOM } from '../../actions/appActions';
import { SET_USERS } from '../../actions/usersActions';

const initialState = {
    messages: { lobby: [] },
    room: 'lobby',
};

function appState(state = initialState, action) {
    switch (action.type) {
    case SET_MESSAGES: {
        const { message, room, lvl } = action.payload;
        return Object.assign({}, state, {
            messages: Object.assign({}, state.messages, {
                [room]: [
                    ...state.messages[room],
                    { message, lvl },
                ]
            }),
        });
    }
    case SET_USERS: {
        let newRooms = state.messages;
        Object.keys(action.payload.users).forEach((user) => {
            if (!newRooms[user.id]) {
                newRooms = Object.assign({}, newRooms, {
                    [user]: [],
                })
            }
        })
        return Object.assign({}, state, {
            messages: Object.assign({}, newRooms)
        })
    }
    case CHANGE_ROOM: {
        return Object.assign({}, state, {
            room: action.payload.room,
        });
    }
    default:
        return state;
    }
}

export default appState;
