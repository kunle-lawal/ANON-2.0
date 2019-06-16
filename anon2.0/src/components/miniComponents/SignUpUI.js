import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    }

    handleSubmit = (e) => {
        
    }

    isEmpty = () => {
        if (this.state.first_name === '' || this.state.first_name === '' || this.state.first_name === '' || this.state.first_name === '') {
            this.setState({
                errors: 'You gotta write something, Don\'t worry its Anonymous :)'
            })
            return true;
        }
        return false;
    }

    checkProfanity = () => {
        const Filter = require('bad-words'),
            filter = new Filter();
        if (filter.isProfane(this.state.comment)) {
            this.setState({
                errors: 'Keep it pg-13 please :)'
            })
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="signup-container row">
                <form className="sign-up col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="first_name" type="text" className="validate first_name"/>
                            <label for="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate last_name"/>
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input value="" id="email" type="email" className="validate email"/>
                            <label for="disabled">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate password"/>
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password-confirm" type="password" className="validate password" />
                            <label for="password2">Confirm Password</label>
                        </div>
                    </div>

                    <div className="btn-flat waves-effect waves-light btn-post black" onClick={this.handleSubmit}>Sign Up</div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: () => dispatch(signUp())
    }
}

export default connect(null, mapDispatchToProps)(SignUp) 