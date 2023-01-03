import actionType from "../actionType";

const CartReducer = (state = { loading: false, cart: [], total: 0 }, action) => {
    switch (action.type) {
        case actionType.SET_CART:
            const cartData = state.cart;
            const hasItemInCartData = cartData.filter(item => item.id === action.payload.id);
            if (hasItemInCartData.length > 0) {
                hasItemInCartData[0].quantity = hasItemInCartData[0].quantity + action.payload.quantity;
                const otherItems = cartData.filter(item => item.id !== action.payload.id);
                return { ...state, cart: [...otherItems, ...hasItemInCartData], loading: false }
            }
            return { ...state, cart: [...state.cart, action.payload], total: state.total + 1, loading: false }
            break;
        case actionType.ADD_TO_CART_LOADING:
            return { ...state, loading: true }
            break;
        case actionType.FETCH_CARTS:
            if (state.cart.length === 0 && localStorage.getItem('cartData')) {
                const localCartData = JSON.parse(localStorage.getItem('cartData'));
                return { ...state, cart: localCartData, total: localCartData.length }
            }
            return state
            break;
        case actionType.REMOVE_FROM_CART:

            const notIncartData = state.cart.filter(item => item.id !== action.payload.id);
            console.log(notIncartData)
            localStorage.setItem('cartData', JSON.stringify(notIncartData))
            return { ...state, cart: notIncartData, total: notIncartData.length, loading: true }
            break;
        default:
            return state
    }

}


export default CartReducer;