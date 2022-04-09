import { GET_CART, ADD_CART } from "../Actions/Actiontypes";

const initialState = {
  cart: { count: 0, name: "", data: [] },
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, cart: action.payload };
    case ADD_CART:
      const { cart } = state;
      cart.data.push(action.payload);
      const cartData = {
        ...cart,
        count: cart.data.length,
        data: cart.data,
      };
      console.log(cartData);
      return { ...state, cart: { ...cartData } };
    default:
      return state;
  }
};

export default cart;
