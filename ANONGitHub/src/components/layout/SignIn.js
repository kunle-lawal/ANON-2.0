import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'

class SignIn extends Component {
    signInAnonymous = (e) => {
        this.props.signIn();
    }
    render() {
        if(this.props.auth.uid) {
            return null;
        } else {
            return (
                <div className="write-container">
                    <div className="write">
                        <h3 onClick={this.signInAnonymous}>Sign In</h3>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn())
    }
}

export default connect(null, mapDispatchToProps)(SignIn) 