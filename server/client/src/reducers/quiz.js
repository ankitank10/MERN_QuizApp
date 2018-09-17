import types from "../actions/types";
const initialState = {
  quizzes:[]
}
export default function(state = initialState, action) {
  switch (action.type) {
    case types.quizzesFetched:
      return{
        ...state,
        quizzes:action.payload
      }
      case types.quizCreated:
        return {
          ...state,
          quizzes: [...state.quizzes, action.payload]
        }
      case types.quizDeleted:
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload)
      }
    default:
      return state;
  }
}
