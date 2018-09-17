import types from "../actions/types";

const initialState = {
    loggedIn: false,
    candidateData:{},
    candidateQuiz:{},
    isFetching:true
}
const candidate = (state = initialState, action) => {
  switch (action.type) {
    case types.quizStarted:
    debugger;
        return{
          ...state,
          loggedIn: true,
          isFetching:false,
          candidateData:action.payload.candidate,
          candidateQuiz:action.payload.candidateQuizData
        }
      case types.candidateQuesFetched:
      debugger;
        return{
          ...state,
          isFetching: false,
          candidateQuiz:action.payload
        }
      case types.resultSubmitted:
      debugger;
      return{
        ...state,
        candidateData:action.payload
      }
    default:
      return state;
  }
}

export const selectQuestion = (state) => {
  let currentQuestion, questionNo;
  if ( Object.keys(state.candidateQuiz).length) {
    questionNo = Math.floor((Math.random() * 2) + 1);
    currentQuestion = state.candidateQuiz.questions[questionNo];
    state.candidateQuiz.questions.splice(questionNo, 1);
  }

  return {currentQuestion, questionNo};
}

export default candidate;
