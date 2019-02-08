import { SET_USERS } from '../../actions/usersActions';

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
    default:
        return state;
    }
}

export default users;
