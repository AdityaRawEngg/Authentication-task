import { combineReducers } from "redux";
import userReducer from "./users.reducer";
import alertReducer from "./alert.reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  alertReducer: alertReducer,
});
export default rootReducer;
