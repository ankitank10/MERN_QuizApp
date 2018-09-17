import { combineReducers } from 'redux';
import auth from './auth';
import question from './question';
import quiz from './quiz';
import candidate, * as fromCandidate from './candidate';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth,
  question,
  quiz,
  form:reduxForm,
  candidate
});

export const selectQuestion = (state) => fromCandidate.selectQuestion(state.candidate);
