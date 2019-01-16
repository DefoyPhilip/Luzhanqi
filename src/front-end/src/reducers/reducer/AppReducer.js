import { SET_MESSAGES } from '../../actions/appActions';

const initialState = {
    messages: [],
};

function appState(state = initialState, action) {
    switch (action.type) {
    case SET_MESSAGES: {
        return Object.assign({}, state, {
            messages: [
                ...state.messages,
                action.payload.message,
            ],
        });
    }
    default:
        return state;
    }
}

export default appState;
