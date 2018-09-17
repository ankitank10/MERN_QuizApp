import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import Modal from '../../utils/modal';
import CreateQuiz from './CreateQuiz';
import { Link } from "react-router-dom";

class QuizList extends Component{
    constructor(props){
        super(props);
        this.state = {
            showQuizModal: false,
            quizModal: {
                questionList: [],
                quizData: {
                    questionsAdded: [],
                    quizName:'',
                    quizDesc:''
                }
            }
        };    
    }
    toggleEditModal = (evt) => {
        let questionId =  evt.target.id.substring(evt.target.id.lastIndexOf("-") + 1, evt.target.id.length);
        this.setState({ showQuizModal: !this.state.showQuizModal,
            questionModal: this.props.question.questions.filter(question => question._id === questionId)[0]
        });
    }
    handleOperation = (evt) => {
        let splitId = evt.target.id.split('-');
        switch (splitId[1]) {
            case 'Delete':
                this.props.deleteQuiz(splitId[2]);
                break;
            case 'Edit':
                this.setState({ showQusetionModal: !this.state.showQusetionModal,
                questionModal: this.props.question.questions.filter(question => question._id === splitId[2])[0]
            })
            break;
            default:
                break;
        }
    }
    componentDidMount(){
        this.props.fetchQuizzes();
    }
    deleteQuestion = (evt) => {
        let questionId =  evt.target.id.substring(evt.target.id.lastIndexOf("-") + 1, evt.target.id.length);
        this.props.deleteQuestion(questionId);
    }
    handleModalClose = () => {
        this.setState({ showQuizModal: !this.state.showQuizModal
        });
    }
    renderQuizList = () => {
        return(
        <tbody>
        {this.props.quiz.quizzes.map((element, index) => {
            return(
                <tr key = {`${index}_${element}` }>
                    <td scope="row">{element.quizName}</td>
                    {this.props.quizListButtons.map((item,index) => {
                        if(item === 'SendLink'){
                            return(
                                <td key = {`${index}_${item}`}>
                                    <Link className="btn btn-header" to= {`/quizes/${element._id}`}>
                                        Take Quiz
                                    </Link>
                                </td>
                            )
                        }
                        return(<td key = {`${index}_${item}`}><button id={`btn-${item}-${element._id}`} className="btn btn-header" onClick={this.handleOperation}>{item}</button></td>)
                     })
                    }
                </tr>
            )
            })
        }   
        </tbody>
    )
    }
    render(){
        return(
            <div className="container">
            <div className="row">
            <div className="col-xs-6">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Quiz Title</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                {this.renderQuizList()}
            </table>
            </div>
            </div>
                
                {this.props.quizListButtons.indexOf('Edit') > -1 &&
                    <Modal show={this.state.showQuizModal}  >
                        <CreateQuiz handleClose={this.handleModalClose} handleSave = {this.props.editQuiz} quizModal = {this.state.quizModal} />
                    </Modal>
                }
            </div>
        )
    }
}

const mapStateToProps = (state1) => {
    return({
        quiz:state1.quiz
    })
}
export default connect(mapStateToProps, actions)(QuizList);