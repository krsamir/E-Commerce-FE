import { combineReducers } from "redux";
import toastReducers from "./ToastReducers";
import loginReducers from "./LoginReducer";
export default combineReducers({
  toasts: toastReducers,
  account: loginReducers,
});
