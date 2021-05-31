import { userActionTypes } from "../constants/userAction.types";

const initialState = {
  message: "",
  status: "",
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.ERROR:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
      };

    default:
      return { ...state };
  }
};

export default alertReducer;
