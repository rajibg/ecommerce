import actionType from "../actionType";

const TestReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case actionType.SET_LOADING:
            return { ...state, loading: !state.loading }
            break;
        default:
            return state
            break;
    }

}

export default TestReducer;