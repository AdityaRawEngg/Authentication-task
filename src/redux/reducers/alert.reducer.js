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
    // case userActionTypes.CLEARERROR:
    //   return { ...state };

    default:
      return { ...state };
  }
};

export default alertReducer;
