import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

let answersGiven = {};
class QuestionDisplay extends Component {
    constructor(props) {
        super(props);
    }
    handleInputChange = (evt) => {
        if(evt.target.type === 'submit'){
            this.props.onChange(answersGiven);
            answersGiven = {};
        } else if(evt.target.type === 'checkbox'){
            if(answersGiven.hasOwnProperty(evt.target.id)){
                answersGiven[evt.target.id] = evt.target.checked
            }else{
                answersGiven[evt.target.id] = evt.target.checked
            }
        }
    }
    displayQuestion = () => {
        const {quesData} = this.props;
        let Answers = quesData.answers.map((item, index) => {
            return(
                <p key = {`${item._id}_container`}>
                    <label>
                    <input id={item._id} key = {item._id} className="browser-default" name={item.ansId} type="checkbox" onChange={this.handleInputChange}/>
                        <span>{item.ansText}</span>
                    </label>
                </p>
            )
        })
        return(
            <div className='container'>
                <h3>{quesData.questionText}</h3>
                {Answers}
                <div>
                <button type="submit" className="waves-effect waves-light btn-small" onClick={this.handleInputChange}>
                    Submit
                </button>
                <button type="submit" className="waves-effect waves-light btn-small" onClick={this.handleInputChange}>
                    Next
                </button>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div >
                {this.displayQuestion()}
            </div>
        )
    }
}
export default QuestionDisplay;