import { SUCCESS_TOAST, ERROR_TOAST } from "../Actions/Actiontypes";
import toast from "react-hot-toast";

const initialState = {};

const message = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_TOAST:
      toast.success(action.payload.message, {
        duration: action.payload.duration,
        style: {
          borderRadius: "10px",
        },
      });
      return null;

    case ERROR_TOAST:
      toast.error(action.payload.message, {
        duration: action.payload.duration,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return null;

    default:
      return state;
  }
};

export default message;
