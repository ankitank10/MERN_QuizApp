import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import LogoImg from "../assets/images/quiz.jpg"

class Landing extends React.Component {
    render() {
        return (
                <div class="text-center">
                <h3>{`Let's`}</h3>
                    <img src={LogoImg} class="rounded" alt="Landing Image"/>
                </div>
        )
    }

}
export default Landing;