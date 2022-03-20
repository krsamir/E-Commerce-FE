import { OPEN_MODAL, CLOSE_MODAL } from "../Actions/Actiontypes";

const initialState = {
  modalState: false,
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalState: true };

    case CLOSE_MODAL:
      return { ...state, modalState: false };

    default:
      return state;
  }
};

export default message;
