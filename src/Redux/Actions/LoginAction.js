import { OPEN_MODAL, CLOSE_MODAL } from "./Actiontypes";

export const openModal = () => async (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: true,
  });
};

export const closeModal = () => async (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
    payload: false,
  });
};
