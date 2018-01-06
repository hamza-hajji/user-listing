import { GET_USERS } from "../constants";

export default (state = null, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state;
  }
}