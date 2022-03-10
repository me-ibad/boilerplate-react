import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import VendorReducer from "./VendorReducer";

export default combineReducers({
  User: UserReducer,
  Vendor: VendorReducer,
});
