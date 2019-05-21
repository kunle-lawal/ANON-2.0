import React from 'react'
import { Link } from 'react-router-dom'
import CreateStoryLayout from './CreateStoryLayout'
import SignIn from './SignIn';
import MyProfile from './MyProfile'
import Drafts from './Drafts'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { toggleMobileNav, resetView } from '../../store/actions/navActions'

const Navbar = (props) => {
    const {auth, nav, Ids, data} = props; 
    const mobile_nav = nav.mobileToggled ? 'mobile_nav' : 'mobile_nav-noDisplay';
    console.log(props);
    var location = window.location.pathname;
    if(location.includes('admin')) {
        return (
            <nav className="top_section black">
                <div className="logo" onClick={props.resetView}>
                    <Link to='/' className="left"><h1 className="logo">Admin - Tech Talk</h1></Link>
                </div>

                <div className="nav_items">
                    <SignIn userInfo={{ auth, Ids }} />
                </div>
                <div className="mobile_nav_button" onClick={props.toggleMobileNav}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className={mobile_nav} onClick={props.toggleMobileNav}>
                    <SignIn userInfo={{ auth, Ids }} />
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="top_section">
                <div className="logo" onClick={props.resetView}>
                    <Link to='/' className="left"><h1 className="logo">Tech Talk</h1></Link>
                </div>

                <div className="nav_items">
                    <CreateStoryLayout />
                    <MyProfile userInfo={{ auth }} />
                    <SignIn userInfo={{ auth, Ids }} />
                </div>
                <div className="mobile_nav_button" onClick={props.toggleMobileNav}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className={mobile_nav} onClick={props.toggleMobileNav}>
                    <SignIn userInfo={{ auth, Ids }} />
                    <CreateStoryLayout text={'Write Story'} />
                    <MyProfile userInfo={{ auth }} />
                </div>
            </nav>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMobileNav: () => dispatch(toggleMobileNav()),
        resetView: () => dispatch(resetView()),
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        nav: state.nav,
        Ids: state.firestore.data.Ids,
        data: state.firestore.data
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'Ids' }
    ])
)(Navbar)