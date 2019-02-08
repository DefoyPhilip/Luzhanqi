import { SET_MESSAGES } from '../../actions/appActions';

const initialState = {
    messages: [],
};

function appState(state = initialState, action) {
    switch (action.type) {
    case SET_MESSAGES: {
        const { message, lvl } = action.payload;
        return Object.assign({}, state, {
            messages: [
                ...state.messages,
                { message, lvl },
            ],
        });
    }
    default:
        return state;
    }
}

export default appState;
