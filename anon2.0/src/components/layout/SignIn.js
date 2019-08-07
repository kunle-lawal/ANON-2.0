import React from 'react'
import {connect} from 'react-redux'
import { showSignInModule } from '../../store/actions/authActions'

const SignIn = (props) => {
    if(props.userInfo.auth.uid) {
        return null;
    } else {
        return (
            <div className="item-container">
                <div className="signIn item sign">
                    <h3 onClick={props.showSignInModule}>Sign In</h3>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showSignInModule: () => dispatch(showSignInModule())
    }
}

export default connect(null, mapDispatchToProps)(SignIn) 