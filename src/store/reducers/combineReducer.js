import { combineReducers } from 'redux';
import userReducer from './auth/userReducer';

export const master = combineReducers({
  userInfo: userReducer,
});
