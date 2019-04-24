import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'

class SignIn extends Component {
    signInAnonymous = (e) => {
        // console.log(this.props);
        // console.log(this.props.userInfo.Ids.userIds);
        this.props.signIn(this.props.userInfo.Ids.userIds);
    }
    render() {
        // console.log(this.props);
        if(this.props.userInfo.auth.uid) {
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
        signIn: (id) => dispatch(signIn(id))
    }
}

export default connect(null, mapDispatchToProps)(SignIn) 