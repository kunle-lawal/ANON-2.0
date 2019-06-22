import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpUi from '../miniComponents/SignUpUI'

const WelcomePage = (props) => {
    return (
        <div className="welcome_container">
            <div className="container welcome">
                {/* <div className="title item">
                    <h1>Join over 1000 Professionals</h1>
                </div>

                <div className="choices container center item">
                    <div className="choice">
                        <div className="join">
                            <div className="btn-large waves-effect waves-light">Join the conversation</div>
                        </div>

                        <div className="signupNow">
                            <div className="btn-large waves-effect waves-light">Sign Up</div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="signup container">
                <br/>
                <br/>
                <h2>Join the Conversation</h2>
                <SignUpUi/>
            </div>
        </div>
    )
}

export default connect()(WelcomePage) 