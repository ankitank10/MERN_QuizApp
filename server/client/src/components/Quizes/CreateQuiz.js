import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {connect} from 'react-redux';
import * as actions from '../../actions';


class CreateQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            questionList: this.props.question.questions,
            quizData: {
                questionsAdded: [],
                quizName:'',
                quizDesc:''
            }
        };
    }
    handleQuizName = (evt) => {
        this.setState({
            quizData: {...this.state.quizData,
                quizName: evt.target.value
            }
        })
    }
    handleQuizDesc = (evt) => {
        this.setState({
            quizData: {...this.state.quizData,
                quizDesc: evt.target.value
            }
        })
    }
    handleSave = () => {
        this.props.handleSave(this.state.quizData);
        //this.setState(initialState);
        this.props.handleClose();
    }
    handleAddBtnClick = (evt) => {
        let splitId = evt.target.id.split('-');
        this.setState((prevState, props) => {
                return{
                    ...this.state,
                    quizData:{ ...this.state.quizData,
                    questionsAdded: [...this.state.quizData.questionsAdded, this.state.questionList.filter(question => question._id === splitId[2])[0]]
                    },
                    questionList: this.state.questionList.filter(question => question._id !== splitId[2])
                }
         });
    }
    componentDidMount(){
        //this.props.fetchQuestions();
    }
    componentDidUpdate(prevProps){
        if (this.props.question.questions !== prevProps.question.questions ) {
            this.setState({
                ...this.state,
                questionList:this.props.question.questions
            })
        }
    }
    handleQuesRowDelete = (evt) => {
        let splitId = evt.target.id.split('-');
        this.setState((prevState, props) => {
                return{
                    ...this.state,
                    questionList: [...this.state.questionList, this.state.quizData.questionsAdded.filter(question => question._id === splitId[2])[0]],
                    quizData:{...this.state.quizData,
                        questionsAdded: this.state.quizData.questionsAdded.filter(question => question._id !== splitId[2])
                    }
                    
                }
         });
    }
    renderQuestionRows = () => {
        return(
            <tbody>
            {this.state.quizData.questionsAdded.map((ques, index) => {
                return(
                    <tr>
                        <td>{ques.questionText}</td>
                        <td>
                            <button id={`btn-add-${ques._id}`} type="button" className="btn btn-primary" onClick = {this.handleQuesRowDelete}>Delete</button>
                        </td>
                    </tr>
                )
                })
            }   
            </tbody>
        )
    }
    renderQuestionList = () => {
        return(
            <tbody>
            {this.state.questionList.map((ques, index) => {
                return(
                    <tr  key = {`${index}_${ques}`}>
                        <td>{ques.questionText}</td>
                        <td>
                            <button id={`btn-add-${ques._id}`} className = 'btn' onClick={this.handleAddBtnClick}>Add</button>
                            
                        </td>
                    </tr>
                )
                })
            }   
            </tbody>
        )
    }
    render(){
        return(
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Create Quiz</h5>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-6">
                        <input type="text" placeholder="Quiz Name" onChange = {this.handleQuizName} value={this.state.quizData.quizName}></input>
                        <input type="text" placeholder="Quiz Description/Purpose" onChange = {this.handleQuizDesc} value={this.state.quizData.quizDesc}></input>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Questions</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                                {this.renderQuestionRows()}
                        </table>
                    </div>
                    <div className="col-xs-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Questions</th>
                                    <th scope="col">Add</th>
                                </tr>
                            </thead>
                            {this.renderQuestionList()}
                        </table>
                        
                    </div>
                </div>    
            </div>     
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.props.handleClose}>Cancel</button>
                <button type="button" className="btn btn-secondary" onClick={this.handleSave}>Save</button>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state1) => {
    return({
        question:state1.question
    })
}
export default connect(mapStateToProps, actions)(CreateQuiz);