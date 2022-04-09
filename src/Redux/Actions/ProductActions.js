import { GET_CART, SUCCESS_TOAST, ERROR_TOAST, ADD_CART } from "./Actiontypes";
import axios from "axios";

export const getCart = () => (dispatch) => {
  axios
    .get(`/transaction/cart`)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((e) => console.log(e));
};

export const addToCart = (productCode) => (dispatch) => {
  axios
    .get(`/transaction/addcart/${productCode}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: SUCCESS_TOAST,
          payload: { message: res.data.message, duration: 6000 },
        });
        dispatch({
          type: ADD_CART,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: ERROR_TOAST,
          payload: { message: res.data.message, duration: 6000 },
        });
      }
    })
    .catch((e) => console.log(e));
};
