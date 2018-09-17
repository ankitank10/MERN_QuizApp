import types from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case types.fetchedUser:
      return action.payload || false;
    case types.loggedout:
      return action.payload;
    default:
      return state;
  }
}
