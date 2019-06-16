import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

class SignOut extends Component {
    signOutAnonymous = (e) => {
        this.props.signOut();
    }
    render() {
        return (
            <div className="item-container">
                <div className="item sign">
                    <h3 onClick={this.signOutAnonymous}>Sign Out</h3>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignOut) 