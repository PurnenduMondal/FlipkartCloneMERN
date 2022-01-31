import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { combineReducers } from "redux";
import { loginFormReducer } from "./loginFormReducer";


const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  showLoginForm: loginFormReducer,
});

export default rootReducer;
