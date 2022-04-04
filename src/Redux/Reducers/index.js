import { combineReducers } from "redux";
import toastReducers from "./ToastReducers";
import loginReducers from "./LoginReducer";
import ProductReducer from "./ProductReducer";
export default combineReducers({
  toasts: toastReducers,
  account: loginReducers,
  products: ProductReducer,
});
