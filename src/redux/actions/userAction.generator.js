import { userActionTypes } from "../constants/userAction.types";

const userActionGenerator = (actionTypes, payload = {}) => {
  switch (actionTypes) {
    case userActionTypes.ADD:
      return {
        type: userActionTypes.ADD,
        payload: { ...payload },
      };
    default:
      return {
        type: "Invalid",
      };
  }
};

export default userActionGenerator;
