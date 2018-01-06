import { GET_USERS, SET_FILTERS, CLEAR_FILTER } from "./constants";
import { Api } from './api';

export const getUsers = () => {
  return (dispatch) => {
    Api.getUsers().then((users) => {
      dispatch({
        type: GET_USERS,
        users
      });
    });
  }
}

export const setFilters = (filters) => {
  return {
    type: SET_FILTERS,
    filters
  }
}

export const clearFilter = (filterName) => {
  return {
    type: CLEAR_FILTER,
    filterName
  }
}