import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';


class CreateQuestion extends Component{
    constructor(props){
        super(props);
        this.state = props.questionModal;
    }
    handleQestionText = (evt) => {
        this.setState({
            questionText: evt.target.value
        })
    }
    handleAnswer = (evt) => {
            this.setState({...this.state, 
                answers: this.state.answers.map(item => {
                    if (item.ansId === evt.target.id) {
                        return {
                            ...item,
                            ansText: evt.target.value
                        };
                    }
                    if(evt.target.type === 'button'){
                        if(evt.target.id.indexOf(item.ansId) > -1){
                            return {
                                ...item,
                                isCorrect: !item.isCorrect
                            };
                        }

                    }
                    return item;
                })
        })
    }
    handleDropdown = (evt) => {
        this.setState({
            [evt.target.name]:evt.target.value
        })
    }
    handleSave = () => {
        this.props.handleSave(this.state);
        this.setState(this.props.questionModal);
        this.props.handleClose();
    }
    componentDidUpdate(prevProps) {
        if (this.props.questionModal !== prevProps.questionModal ) {
            this.setState(this.props.questionModal);
        }
    }
    render(){
        const{questionText, answers, duration, complexity} = this.state;
        return(
            <div className="modal-content">
                <h5 className="modal-title">Add Question</h5>
            <div className="modal-body">
                <input type="text" placeholder="Qusetion Text" onChange = {this.handleQestionText} value={questionText}></input>
                <label>
                    Duration
                    <select value={duration} id="select-duration" className="browser-default" onChange={this.handleDropdown} name='duration'>
                        <option value="60">60sec</option>
                        <option value="75">75sec</option>
                        <option value="90">90sec</option>
                    </select>
                </label>
                <label>
                    Complexity
                    <select value={complexity} id="select-complexity" className="browser-default" onChange={this.handleDropdown} name='complexity'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </label>
                    <input id="ans1" type="text" placeholder="Answer 1" onChange={this.handleAnswer} value = {answers[0].ansText}></input>
                    <button id="btn-ans1-correct" type="button" className={answers[0].isCorrect ? 'btn-success': 'waves-effect waves-light btn-small'} onClick={this.handleAnswer}>
                    Is Correct
                    </button>
                    <input type="text" id="ans2" placeholder="Answer 2" onChange={this.handleAnswer} value = {answers[1].ansText}></input>
                    <button type="button" id="btn-ans2-correct" className={answers[1].isCorrect ? 'btn-success': 'waves-effect waves-light btn-small'} onClick={this.handleAnswer}>
                        Is Correct
                    </button>
                    <input type="text" id="ans3" placeholder="Answer 3" onChange={this.handleAnswer} value = {answers[2].ansText}></input>
                    <button type="button" id="btn-ans3-correct" className={answers[2].isCorrect ? 'btn-success': 'waves-effect waves-light btn-small'} onClick={this.handleAnswer}>
                    Is Correct
                    </button>
                    <input type="text" id="ans4" placeholder="Answer 4" onChange={this.handleAnswer} value = {answers[3].ansText}></input>
                    <button type="button" id="btn-ans4-correct" className={answers[3].isCorrect ? 'btn-success': 'waves-effect waves-light btn-small'} onClick={this.handleAnswer}>
                    Is Correct
                    </button>
            </div>     
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.props.handleClose}>Cancel</button>
                <button type="button" className="btn btn-secondary" onClick={this.handleSave}>Save</button>
            </div>
            </div>
        )
    }
}

export default CreateQuestion;