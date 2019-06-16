import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'

const SignIn = (props) => {
    if(props.userInfo.auth.uid) {
        return null;
    } else {
        return (
            <div className="item-container">
                <div className="signIn item sign">
                    <h3 onClick={() => { props.signIn(props.userInfo.Ids.userIds)}}>Sign In</h3>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (id) => dispatch(signIn(id))
    }
}

export default connect(null, mapDispatchToProps)(SignIn) 