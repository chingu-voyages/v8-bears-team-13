// Root Reducer
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dashReducer from './dashReducer';

export default combineReducers({
  auth: authReducer, // access state in container components using `this.props.auth`
  dash: dashReducer
});
