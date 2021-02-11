import { combineReducers } from "redux";
import userReducer from "./users.reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
});
export default rootReducer;
