import actionType from "../actionType"

const intialState = {
    products: [],
}

const ProductReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
            break;
        default:
            return state
    }
}
export default ProductReducer;