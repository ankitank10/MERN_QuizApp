import React from "react";
import {connect} from 'react-redux';
import * as actions from '../../actions';
import QuestionDisplay from './QuestionDisplay';
import {Redirect} from 'react-router-dom';

class QuizQuestions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            candidateQuiz:this.props.candidate.candidateQuiz,
            score:{
                attempt:0,
                correct:0
            },
            currentIndex:0

            
        };
    }
    handleQuestionChange = (ans) => {
        console.log(ans);
        console.log(this.props.candidate.candidateData);
        if(Object.keys(ans).length){
            let answers = this.props.candidate.candidateQuiz.questions[this.state.currentIndex].answers,
            isScored = true;
            for (let index = 0; index < answers.length; index++) {
                if(answers[index].isCorrect ){
                    if(ans[answers[index]._id] !== true){
                    isScored = false;
                    break;
                    }
                }
                
            }
            this.setState((prevState, props) => {
                return{
                    ...this.state,
                    score:{ ...this.state.score,
                        attempt: this.state.score.attempt + 1,
                        correct: (isScored ? this.state.score.correct + 1:this.state.score.correct)
                    },
                    currentIndex:this.state.currentIndex + 1
                }
         });
        }
        
    }
    createQuestion = () => {
        if(this.state.currentIndex < this.props.candidate.candidateQuiz.questions.length){
            return(
                <QuestionDisplay quesData = {this.props.candidate.candidateQuiz.questions[this.state.currentIndex]} onChange = {this.handleQuestionChange}></QuestionDisplay>
            )
        } else{
            let percentage = (this.state.score.correct/this.state.score.attempt) * 100;
            debugger;
            {this.props.submitResult(percentage, this.props.candidate.candidateData._id)}
        return (
           
            <Redirect to = '/result'></Redirect>
        )
    }
    }
    render() {
        if(!this.props.auth){
            return(
                <Redirect to = '/'></Redirect>
            )
        }
        const { isFetching } = this.props.candidate;
        if (isFetching || isFetching === undefined) return <div className="loader">Loading</div>;
        return (
            <div>
                {this.createQuestion()}
            </div>
        )
    }

}
const mapStateToProps = (state1) => {
    return({
        candidate:state1.candidate,
        auth:state1.auth
    })
}
export default connect(mapStateToProps, actions)(QuizQuestions);