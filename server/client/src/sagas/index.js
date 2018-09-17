import {call, takeEvery, put, all, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from "axios";
import {getFromStorage,setInStorage} from '../utils/storage';

function* fetchUser() {
    try {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            const authResponse = yield axios.get("/api/account/verify?token=" + token)
            yield put({type: 'FETCHED_USER', payload: authResponse.data.success});
        }else{
            yield put({type: 'FETCHED_USER', payload: false});
        }
              
    } 
    catch (error) {
        console.log(error);
    }
}
function* logoutUser() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      const logoutResponse = yield axios.get("/api/account/logout?token=" + token);
      if(logoutResponse.data.success){
        localStorage.removeItem('the_main_app');
        yield put({type: 'LOGGED_OUT', payload: false});
      }
    }
}

function* addQuestion(action){
    const response = yield axios.post("/api/createQuestion", action.payload);
    if(response.data.success){
        yield put({type: 'QUESTION_ADDED', payload: response.data.question});
      }
}
function* fetchQuestions(action){
    const response = yield axios.get("/api/getQuestions");
    if(response.data.success){
        yield put({type: 'QUESTIONS_FETCHED', payload: response.data.questions});
    }
}
function* deleteQuestion(action){
    const response = yield axios.delete("/api/deleteQuestions", {
                            data: { _id: action.payload }
                        })
    if(response.data.success){
        yield put({type: 'QUESTION_DELETED', payload: action.payload});
    }
}
function* deleteQuiz(action){
    const response = yield axios.delete("/api/deleteQuiz", {
                            data: { _id: action.payload }
                        })
    if(response.data.success){
        yield put({type: 'QUIZ_DELETED', payload: action.payload});
    }
}



function* editQuestion(action){
    const response = yield axios.put("/api/editQuestion", action.payload);
    if(response.data.success){
        yield put({type: 'QUESTION_EDITED', payload: response.data.question});
      }
}

function* editQuiz(action){
    //const response = yield axios.put("/api/editQuiz", action.payload);
    //if(response.data.success){
        //console.log(response);
        //yield put({type: 'QUIZ_EDITED', payload: response.data.question});
      //}
}

function* fetchQuizzes(){
    const response = yield axios.get("/api/getQuizzes");
    if(response.data.success){
       yield put({type: 'QUIZZES_FETCHED', payload: response.data.quizzes});
    }
}

function* createQuiz(action){
    const response = yield axios.post("/api/createQuiz", action.payload);
    if(response.data.success){
        yield put({type: 'QUIZ_CREATED', payload: response.data.quiz});
      }
}

function* quizFormSubmit(action){
    const response = yield axios.post("/api/candidateLogin", action.payload);
    if(response.data.success){
        const quizData = yield axios.get("/api/fetchCandQues?quizId="+action.payload.quizId);
        if(quizData.data.success){
            let sendData = {candidate:response.data.candidate, candidateQuizData:quizData.data.quiz}
            yield put({type: 'QUIZ_STARTED', payload: sendData});
        }
        
      }
}
function* fetchCandidateQuestions(action){
    const response = yield axios.get("/api/fetchCandQues?quizId="+action.payload);
    if(response.data.success){
       yield put({type: 'CANDIDATE_QUES_FETCHED', payload: response.data.quiz});
    }
}
function* submitResult(action){
    debugger;
    const response = yield axios.put("/api/submitResult", action.payload);
    if(response.data.success){
        yield put({type: 'RESULT_SUBMITTED', payload: response.data.candidate});
    }
}

function* watchFetchUserTakeEvery() {
    yield takeEvery('FETCH_USER', fetchUser)
}
function* watchLogoutTakeEvery() {
    yield takeEvery('LOGOUT_USER', logoutUser)
}
function* watchAddQuestionTakeEvery() {
    yield takeEvery('ADD_QUESTION', addQuestion)
}
function* watchFetchQuestionsTakeEvery() {
    yield takeEvery('FETCH_QUESTIONS', fetchQuestions)
}
function* watchDelQuestionTakeEvery() {
    yield takeEvery('DELETE_QUESTION', deleteQuestion)
}

function* watchEditQuestionTakeEvery() {
    yield takeEvery('EDIT_QUESTION', editQuestion)
}

function* watchCreateQuizTakeEvery() {
    yield takeEvery('CREATE_QUIZ', createQuiz)
}
function* watchEditQuizTakeEvery() {
    yield takeEvery('EDIT_QUIZ', editQuiz)
}
function* watchFetchQuizzesTakeEvery() {
    yield takeEvery('FETCH_QUIZZES', fetchQuizzes)
}
function* watchDeleteQuizTakeEvery() {
    yield takeEvery('DELETE_QUIZ', deleteQuiz)
}
function* watchQuizFormSubmitTakeEvery() {
    yield takeEvery('QUIZ_FORM_SUBMIT', quizFormSubmit)
}
function* watchFetchCandQuesTakeEvery() {
    yield takeEvery('FETCH_CAND_QUESTIONS', fetchCandidateQuestions)
}

function* watchSubmitResultTakeEvery() {
    yield takeEvery('SUBMIT_RESULT', submitResult)
}

export default function* rootSaga() {
    yield all([
        watchFetchUserTakeEvery(),
        watchLogoutTakeEvery(),
        watchAddQuestionTakeEvery(),
        watchFetchQuestionsTakeEvery(),
        watchDelQuestionTakeEvery(),
        watchEditQuestionTakeEvery(),
        watchCreateQuizTakeEvery(),
        watchEditQuizTakeEvery(),
        watchFetchQuizzesTakeEvery(),
        watchDeleteQuizTakeEvery(),
        watchQuizFormSubmitTakeEvery(),
        watchFetchCandQuesTakeEvery(),
        watchSubmitResultTakeEvery()
    ])
  }