import { SUCCESS_TOAST, ERROR_TOAST } from "./Actiontypes";

export const successToast =
  (message, duration = 6000) =>
  async (dispatch) => {
    dispatch({
      type: SUCCESS_TOAST,
      payload: { message, duration },
    });
  };

export const errorToast =
  (message, duration = 6000) =>
  async (dispatch) => {
    dispatch({
      type: ERROR_TOAST,
      payload: { message, duration },
    });
  };
