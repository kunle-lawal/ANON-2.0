import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    signOutAnonymous = (e) => {
        this.props.signUp();
    }
    render() {
        return (
            <div className="item-container">
                <div className="item sign">
                    <h3 onClick={this.signOutAnonymous}>Sign up</h3>
                </div>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signUp: () => dispatch(signUp())
//     }
// }

export default connect(null, null)(SignUp) 