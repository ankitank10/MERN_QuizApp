import axios from "axios";
import types from "./types";

function fetchUser() {
  return { type: types.fetchUser }
}

function logoutUser() {
  return { type: types.logoutUser }
}

function addQuestion(question) {
  return { type: types.addQuestion, payload:question }
}

function fetchQuestions() {
  return { type: types.fetchQuestions}
}
function fetchQuizzes() {
  return { type: types.fetchQuizzes}
}
function deleteQuestion(id){
  return { type: types.deleteQuestion, payload:id}
}

function editQuestion(question){
  return { type: types.editQuestion, payload:question}
}

function createQuiz(quizData){
  return { type: types.createQuiz, payload:quizData}
}

function editQuiz(quiz){
  return { type: types.editQuiz, payload:quiz}
}
function deleteQuiz(id){
  return { type: types.deleteQuiz, payload:id}
}

function quizFormSubmit(values,history){
  let paths = window.location.pathname.split('/');
  values.quizId = paths[paths.length - 1];
  history.push('/quizQuestions');
  return { type: types.quizFormSubmit, payload:values}
}

function fetchCandidateQuestions(quizId){
  debugger;
  return { type: types.fetchCandidateQuestions, payload:quizId}
}

function submitResult(score, id){
  debugger;
  let data = {score,id}
  return { type: types.submitResult, payload:data}
}
export { fetchUser, logoutUser, addQuestion, fetchQuestions, deleteQuestion, editQuestion, createQuiz, deleteQuiz,editQuiz, fetchQuizzes, quizFormSubmit, fetchCandidateQuestions, submitResult };
