import { SET_FILTERS, CLEAR_FILTER } from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        ...action.filters
      };
    case CLEAR_FILTER:
      return {
        ...state,
        [action.filterName]: ''
      }
    default:
      return state;
  }
}