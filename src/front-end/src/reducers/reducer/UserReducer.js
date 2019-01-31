import { SET_USER_VALUES } from '../../actions/userActions';

function userReducer(state = {}, action) {
    switch (action.type) {
    case SET_USER_VALUES: {
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
