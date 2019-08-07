import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../../store/actions/authActions'

class SignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
        errors: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        if (!this.inputError()){return 0}
        const authInfo =  this.state;
        this.props.signUp(authInfo)
    }

    validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    inputError = () => {
        let errors = [];
        let concatErrors = (string, newString) => string + ' & ' + newString;
        if (!this.validateEmail(this.state.email)) {
            errors.push('Please give us a valid email');
        } 
        if(this.state.password !== this.state.password_confirm) {
            errors.push('Passwords do not match');
        }
        if ((this.state.password === '')) {
            errors.push('Password field is empty');
        }
        if ((this.state.password < 6)) {
            errors.push('Password should be at least 6 characters');
        }
        if (errors.length === 0) { this.setState({errors: ''}); return true } else { errors =  (errors.length > 1) ? (errors.reduce(concatErrors)) : (errors[0]);};
        this.setState({
            errors: errors
        })
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
        const {errors} = this.state
        return (
            <div className="signup row">
                <form className="sign-up col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="first_name" type="text" className="validate first_name" onChange={this.handleChange} value={this.state.first_name}/>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate last_name" onChange={this.handleChange} value={this.state.last_name}/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate email" onChange={this.handleChange} value={this.state.email}/>
                            <label htmlFor="disabled">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate password" onChange={this.handleChange} value={this.state.password}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password_confirm" type="password" className="validate password" onChange={this.handleChange} value={this.state.password_confirm}/>
                            <label htmlFor="password2">Confirm Password</label>
                        </div>
                    </div>

                    <div className="btn-flat waves-effect waves-light btn-post" onClick={this.handleSubmit}>Sign Up</div>
                </form>
                <div className="red-text error-message center">
                    {<p className="red-text error-message center">{errors}</p>}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (authInfo) => dispatch(signUp(authInfo))
    }
}

export default connect(null, mapDispatchToProps)(SignUp) 