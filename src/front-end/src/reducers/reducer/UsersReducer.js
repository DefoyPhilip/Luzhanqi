import { SET_USERS, REMOVE_USERS } from '../../actions/usersActions';

function users(state = {}, action) {
    switch (action.type) {
    case SET_USERS: {
        const { users } = action.payload;
        let newState = state;
        Object.keys(users).forEach((id) => {
            newState = Object.assign({}, newState, {
                [id]: {
                    id, 
                    name: users[id].name,
                },
            })
        })
        return newState;
    }
    case REMOVE_USERS: {
        const tempState = state;
        delete tempState[action.payload.userId];
        return Object.assign({}, tempState);
    }
    default:
        return state;
    }
}

export default users;
