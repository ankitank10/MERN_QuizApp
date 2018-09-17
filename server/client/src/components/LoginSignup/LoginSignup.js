
import React, { Component } from 'react';
import 'whatwg-fetch';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {setInStorage} from '../../utils/storage';

class LoginSignup extends Component {
  constructor(props) {
    super(props);
    this.state = { token: '', signUpError: '', signInError: '', signInEmail: '', 
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: ''
    };
  }

  onTextboxChangeSignInEmail = (event) => {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword = (event) => {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail = (event) => {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword = (event) => {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp = () => {
    const { signUpEmail, signUpPassword, } = this.state;

    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            signUpEmail: '',
            signUpPassword: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
          });
        }
      });
  }

  onSignIn = () => {
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', {
            token: json.token
          });
          this.setState({
            signInError: json.message,
            signInPassword: '',
            signInEmail: '',
            token: json.token
          });
          //this.context.router.history.push('/')
        } else {
          this.setState({
            signInError: json.message,
          });
        }
      });
  }

  render() {
    const { token, signInError, signInEmail, signInPassword, signUpEmail, signUpPassword, signUpError} = this.state;

    if (!token) {
      return (
        <div className='container'>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input type="email" placeholder="Email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/>
            <br />
            <input type="password" placeholder="Password" value={signInPassword} onChange= {this.onTextboxChangeSignInPassword}/>
            <br />
            <button onClick={this.onSignIn} className='waves-effect waves-light btn-large'>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} />
            <br />
            <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} /><br />
            <button onClick={this.onSignUp} className='waves-effect waves-light btn-large'>Sign Up</button>
          </div>
        </div>
      );
    }
    return (
        <Redirect to = '/'></Redirect>
    );
    

  }
}
LoginSignup.contextTypes = {
    router: PropTypes.object.isRequired
  }
export default LoginSignup;