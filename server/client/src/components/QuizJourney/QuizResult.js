import React from "react";
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Redirect} from 'react-router-dom';
class QuizResult extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        if(!this.props.auth){
            return(
                <Redirect to = '/'></Redirect>
            )
        }
        return (
            <div className='result'>
                Thanks for taking the quiz. You have scored {this.props.candidate.candidateData.score} %
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
export default connect(mapStateToProps, actions)(QuizResult);