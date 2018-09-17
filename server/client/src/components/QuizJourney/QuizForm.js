import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import AvtarImg from "../../assets/images/avatar-01.jpg";
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class QuizForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={FormField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  quizFormSubmit = (values) => {
    this.props.quizFormSubmit(values,this.props.history)
  }
  render() {
    if(!this.props.auth){
      return(
          <Redirect to = '/'></Redirect>
      )
  }
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.quizFormSubmit)}>
            <span className="login100-form-title">
            {`Let's Quiz`}
            </span>
            <span className="login100-form-avatar">
                <img src={AvtarImg} alt="AVATAR"/>
            </span>
          {this.renderFields()}
          <Link to="/" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}
const mapStateToProps = (state1) => {
  return({
      candidate:state1.candidate,
      auth:state1.auth
  })
}
QuizForm = connect( mapStateToProps,actions)(QuizForm);

export default reduxForm({
  validate,
  form: 'quizForm',
  destroyOnUnmount: true
})(QuizForm);
