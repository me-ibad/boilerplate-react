import * as ActionList from "../actions/ActionsList";
const initialState = {
  IS_LOGGED: false,
  TOKEN: null,
  profile: null,
  api_signUp: null,
  facebook_api_signUp: null,
  vendor_application_status: "",
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.IS_LOGGED_IN:
      return { ...state, IS_LOGGED: true };
    case ActionList.IS_LOGGED_OUT:
      return { ...state, IS_LOGGED: false };
    case ActionList.TOKEN:
      return { ...state, TOKEN: payload };
    case ActionList.API_SIGN_UP:
      return { ...state, api_signUp: payload };
    case ActionList.FACEBOOK_API_SIGN_UP:
      return { ...state, facebook_api_signUp: payload };
    case ActionList.USER_PROFILE:
      return { ...state, profile: payload };
    case ActionList.VENDOR_APPLICATION_STATUS:
      return { ...state, vendor_application_status: payload };
    default:
      return state;
  }
};
