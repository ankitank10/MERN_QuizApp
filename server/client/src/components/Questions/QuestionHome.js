import React, {Component} from 'react';
import Modal from '../../utils/modal';
import {connect} from 'react-redux';
import QuestionList from './QuestionList';
import Question from './CreateQuestion';
import * as actions from '../../actions';
import {Redirect} from 'react-router-dom';

const initialQuestionState = { questionText: '', 
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
};

class QuestionHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQusetionModal: false,
            questionListButtons:['Delete','Edit']
         };
    }
    toggleQuestionModal = () => {
        this.setState({ showQusetionModal: !this.state.showQusetionModal });
    }
    
    render(){
        if(!this.props.auth){
            return(
                <Redirect to = '/'></Redirect>
            )
        }
        return(
            <div className='container'>
                <QuestionList questionListButtons = {this.state.questionListButtons}></QuestionList>
                <Modal show={this.state.showQusetionModal}  >
                    <Question handleClose={this.toggleQuestionModal} handleSave = {this.props.addQuestion} questionModal = {initialQuestionState}/>
                </Modal>
                <button className="waves-effect waves-light btn-small" type="button" onClick = { this.toggleQuestionModal}>Add Question</button>
            </div>
        )
    }
}
const mapStateToProps = (state1) => {
    return({
        questions:state1.questions,
        auth:state1.auth
    })
}
export default connect(mapStateToProps, actions)(QuestionHome);