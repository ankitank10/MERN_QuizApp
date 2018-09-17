import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import Modal from '../../utils/modal';
import Question from './CreateQuestion';

class QuestionList extends Component{
    constructor(props){
        super(props);
        this.state = {
            showQusetionModal: false,
            questionModal: { questionText: '', 
            answers:[
                {ansId:'ans1',
                isCorrect: false,
                ansText: ''  
                },
                {ansId:'ans2',
                isCorrect: false,
                ansText: ''  
                },
                {ansId:'ans3',
                isCorrect: false,
                ansText: ''  
                },
                {ansId:'ans4',
                isCorrect: false,
                ansText: ''  
                }
            ],  duration: 60,
            complexity:1,
            }
        };
        this.props.fetchQuestions();    
    }
    toggleEditModal = (evt) => {
        let questionId =  evt.target.id.substring(evt.target.id.lastIndexOf("-") + 1, evt.target.id.length);
        this.setState({ showQusetionModal: !this.state.showQusetionModal,
            questionModal: this.props.question.questions.filter(question => question._id === questionId)[0]
        });
    }
    handleOperation = (evt) => {
        let splitId = evt.target.id.split('-');
        switch (splitId[1]) {
            case 'Delete':
                this.props.deleteQuestion(splitId[2]);
                break;
            case 'Edit':
                this.setState({ showQusetionModal: !this.state.showQusetionModal,
                questionModal: this.props.question.questions.filter(question => question._id === splitId[2])[0]
            })
            break;
            case 'Add':
                if(evt.target.textContent === 'Add'){
                    evt.target.textContent = 'Added';
                    evt.target.className = 'btn-success'
                } else{
                    evt.target.textContent = 'Add';
                    evt.target.classList.remove("btn-success")
                }
                break;
            default:
                break;
        }
    }
    componentDidMount(){
        //this.props.fetchQuestions();
    }
    deleteQuestion = (evt) => {
        let questionId =  evt.target.id.substring(evt.target.id.lastIndexOf("-") + 1, evt.target.id.length);
        this.props.deleteQuestion(questionId);
    }
    handleModalClose = () => {
        this.setState({ showQusetionModal: !this.state.showQusetionModal
        });
    }
    renderQuestionList = () => {
        return(
            <tbody>
            {this.props.question.questions.map((element, index) => {
                return(
                    <tr key = {`${index}_${element}` }>
                        <td scope="row">{element.questionText}</td>
                        {this.props.questionListButtons.map((item,index) => {
                            return(<td key = {`${index}_${item}`}><button id={`btn-${item}-${element._id}`} className="waves-effect waves-light btn-small" onClick={this.handleOperation}>{item}</button></td>)
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
                    <th scope="col">Question List</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                {this.renderQuestionList()}
            </table>
            </div>
            </div>
                {this.props.questionListButtons.indexOf('Edit') > -1 &&
                    <Modal show={this.state.showQusetionModal}  >
                        <Question handleClose={this.handleModalClose} handleSave = {this.props.editQuestion} questionModal = {this.state.questionModal} />
                    </Modal>
                }
            </div>
        )
    }

}

const mapStateToProps = (state1) => {
    return({
        question:state1.question
    })
}
export default connect(mapStateToProps, actions)(QuestionList);