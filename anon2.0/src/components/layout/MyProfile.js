import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

class MyProfile extends Component {
    state = {
        open_model: false
    }

    toggleModule = () => {
        this.setState({
            open_model: !this.state.open_model
        })
    }

    render () {
        if (!this.props.userInfo.auth.uid) {
            return null;
        } else {
            return (
                <div className='profile_nav_container container right'>
                    <div className="right" onClick={this.toggleModule}>
                        <h4 className="title name">Welcome Back <span>{(this.props.userInfo.profileData.first_name)}</span> <i className="material-icons noselect" onClick={this.toggleModule}>keyboard_arrow_down</i></h4>

                        {(this.state.open_model) ? (
                            <div className="profile_nav_items_container container center">
                                <div className="profile_nav_items">
                                    <NavLink to='/profile'><div className="black-text item"><p> <i className="far fa-user"></i> My Profile</p></div></NavLink>
                                    <NavLink to='/myactivity'><div className="black-text item"><p> <i className="fa fa-history"></i> My Activity</p></div></NavLink>
                                    <NavLink to='/bookmarks'><div className="black-text item"><p> <i className="fas fa-bookmark"></i> Bookmarks</p></div></NavLink>
                                    {/* <div className="black-text item"><p>Activity</p></div>
                                    <div className="black-text item"><p>Bookmarks</p></div> */}
                                    <div className="black-text item" onClick={this.props.signOut}><p className="red-text">Log Out</p></div>
                                </div>
                            </div>
                        ) : (null)}
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(MyProfile) 