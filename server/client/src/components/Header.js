import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LogoImg from "../assets/images/logo.png";
import * as actions from '../actions';
import { withRouter } from 'react-router'


class Header extends Component {
    renderHederContent = () => {
        this.props.fetchUser();
        switch (this.props.auth) {
            case null:
              return <li>Loading</li>;
            case false:
              return (
                <ul className="right hide-on-med-and-down">
                        <Link className="nav-item" to= '/loginSignup'>
                            Log In/Sign Up
                        </Link>
                    </ul>
              )
            default:
              return (
                <ul className="right hide-on-med-and-down">
                    <li className="nav-item">
                        <Link className="btn btn-header" to= '/quizes'>
                            Quizes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-header" to= '/questions'>
                            Questions
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/" onClick={this.props.logoutUser}>Logout</a>
                    </li>
                </ul>
              )
          }
    }
  render() {
    return (
        <nav className="nav-wrapper">
          <Link to={"/"} className ="navbar-brand">
            <img src={LogoImg} alt="Logo" className="logoimg" />
          </Link>
            {this.renderHederContent()}
      </nav>
    );
  }
}

const mapStateToProps = (state1) => {
    return({
        auth: state1.auth
    })
}
export default withRouter(connect(mapStateToProps, actions)(Header));
