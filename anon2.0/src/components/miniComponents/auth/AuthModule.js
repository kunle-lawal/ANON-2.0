import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp, closeAuthModule, signIn} from '../../../store/actions/authActions'
import { auth } from 'firebase';

class showAuthModule extends Component {
    state = {
        first_name:'jane',
        last_name:'dow',
        email: '',
        password: '',
        password_confirm: '',
        errors: '',
        // open: this.props.show_module,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount() {
        this.setState({
            errors: this.props.signUp_error
        })
    }

    handleSubmit = (e) => {
        if (!this.inputError()) { return 0 }
        const authInfo = this.state;
        if(this.props.show_module_signIn) {
            this.props.signIn(authInfo);
        } else {
            this.props.signUp(authInfo);
        }
    }

    validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    inputError = () => {
        let errors = [];
        let concatErrors = (string, newString) => string + ', ' + newString;
        if (!this.validateEmail(this.state.email)) {
            errors.push('Please give us a valid email');
        }
        if ((this.state.password === '')) {
            errors.push('Password field is can\'t\ be empty');
        }
        if(!this.props.show_module_signIn) {
            if (this.state.password !== this.state.password_confirm) {
                errors.push('Passwords do not match');
            }
            if ((this.state.password.length < 6)) {
                errors.push('Password should be at least 6 characters');
            }
        }
        if (errors.length === 0) { this.setState({ errors: '' }); return true } else { errors = (errors.length > 1) ? (errors.reduce(concatErrors)) : (errors[0]); };
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
        const { errors } = this.state;
        if (this.props.show_module_signUp || this.props.show_module_signIn) { 
            const signIn = this.props.show_module_signIn;
            return (
                <div className="auth_module_container">
                    {document.getElementById('body').style.overflow = "hidden"}
                    <div className="auth_module row">
                        <h2>{(signIn) ? 'LOG IN' : 'Join the network'}</h2>
                        <i className="material-icons close right" onClick={this.props.closeAuthModule}>close</i>
                        <form className="auth col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" type="email" className="validate email" onChange={this.handleChange} value={this.state.email} />
                                    <label htmlFor="disabled">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate password" onChange={this.handleChange} value={this.state.password} />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            {(signIn) ? null : (
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="password_confirm" type="password" className="validate password" onChange={this.handleChange} value={this.state.password_confirm} />
                                        <label htmlFor="password2">Confirm Password</label>
                                    </div>
                                </div>
                            )}
    
                            <div className="btn-flat waves-effect waves-light btn-post" onClick={this.handleSubmit}>{(signIn) ? 'LOG IN' : 'Sign Up'}</div>
                        </form>
                        <div className="red-text error-message center">
                            {<p className="red-text error-message center">{errors || this.props.signUp_error}</p>}
                        </div>
                    </div>
                </div>
            )
        } else {
            document.getElementById('body').style.overflow = "auto";  
            return (null)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        show_module_signUp: state.auth.show_signUp,
        show_module_signIn: state.auth.show_signIn,
        signUp_error: state.auth.signUp_error
        // nav: state.nav,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (authInfo) => dispatch(signUp(authInfo)),
        signIn: (authInfo) => dispatch(signIn(authInfo)),
        closeAuthModule: () => dispatch(closeAuthModule())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(showAuthModule) 