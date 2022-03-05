import { combineReducers } from "redux";
import toastReducers from "./ToastReducers";
export default combineReducers({
  toasts: toastReducers,
});
