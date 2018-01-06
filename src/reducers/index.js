import { combineReducers } from 'redux';

import filters from './filters';
import users from './users';

export default combineReducers({
  filters,
  users
});