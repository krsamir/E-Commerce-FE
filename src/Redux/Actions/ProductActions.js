import { GET_CART } from "./Actiontypes";
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
