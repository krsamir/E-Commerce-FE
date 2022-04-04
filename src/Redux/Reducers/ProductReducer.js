import { GET_CART } from "../Actions/Actiontypes";

const initialState = {
  cart: { count: 0, name: "", data: [] },
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default cart;
