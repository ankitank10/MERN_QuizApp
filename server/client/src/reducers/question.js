import types from "../actions/types";
const initialState = {
  questions:[]
}
export default function(state = initialState, action) {
  switch (action.type) {
    case types.questionsFetched:
      return{
        ...state,
        questions:action.payload
      }
      case types.questionAdded:
        return {
          ...state,
          questions: [...state.questions, action.payload]
        }
      case types.questionDeleted:
        return {
          ...state,
          questions: state.questions.filter(question => question._id !== action.payload)
        }
      case types.questionEdited:
        let editedQues = action.payload;
        return {
          ...state,
          questions: state.questions.map(ques => {
                    if(ques._id === action.payload._id){
                      return action.payload
                    } return ques
          })
        }

    default:
      return state;
  }
}
