import React, {Component} from 'react';
import Modal from '../../utils/modal';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import CreateQuiz from './CreateQuiz';
import QuizList from './QuizList';
import {Redirect} from 'react-router-dom';

class QuizHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQuizModal: false,
            quizListButtons: ['Delete', 'SendLink']
         };
    }
    toggleQuizModal = () => {
        this.setState({ showQuizModal: !this.state.showQuizModal });
    }
    render(){
        if(!this.props.auth){
            return(
                <Redirect to = '/'></Redirect>
            )
        }
        return(
            <div className='container'>
                <Modal show={this.state.showQuizModal}  >
                    <CreateQuiz handleClose={this.toggleQuizModal} handleSave = {this.props.createQuiz}/>
                </Modal>
                <QuizList quizListButtons = {this.state.quizListButtons}></QuizList>

                <button className="btn btn-success" type="button" onClick = { this.toggleQuizModal}>Create Quiz</button>
            </div>
        )
    }
}
const mapStateToProps = (state1) => {
    return({
        auth:state1.auth
    })
}
export default connect(mapStateToProps, actions)(QuizHome);