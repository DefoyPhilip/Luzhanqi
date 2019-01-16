import { CONNECTED } from '../../actions/userActions';

function userReducer(state = {}, action) {
    switch (action.type) {
    case CONNECTED: {
        return Object.assign({}, state, {
            id: action.payload.id,
            name: action.payload.name,
        });
    }
    default:
        return state;
    }
}

export default userReducer;
