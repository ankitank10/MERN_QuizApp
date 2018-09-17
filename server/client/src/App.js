import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import { connect } from "react-redux";
import LoginSignup from './components/LoginSignup/LoginSignup';
import Quizes from './components/Quizes/QuizHome';
import Questions from './components/Questions/QuestionHome';
import QuizForm from './components/QuizJourney/QuizForm';
import QuizQuestions from './components/QuizJourney/QuizQuestions'
import QuizResult from './components/QuizJourney/QuizResult'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/loginSignup" component={LoginSignup} />
            <Route exact path="/quizes" component={Quizes} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/logout" component={LoginSignup} />
            <Route exact path="/quizQuestions" component={QuizQuestions} />
            <Route exact path="/quizes/*" component={QuizForm} />
            <Route exact path="/result/" component={QuizResult} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
