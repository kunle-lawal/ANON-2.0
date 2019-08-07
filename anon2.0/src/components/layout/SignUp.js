import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showAuthModule } from '../../store/actions/authActions'

class SignUp extends Component {
    render() {
        return (
            <div className="item-container">
                <div className="item sign">
                    <h3 onClick={this.props.showAuthModule}>Sign up</h3>
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

const mapDispatchToProps = (dispatch) => {
    return {
        showAuthModule: () => dispatch(showAuthModule())
    }
}

export default connect(null, mapDispatchToProps)(SignUp) 