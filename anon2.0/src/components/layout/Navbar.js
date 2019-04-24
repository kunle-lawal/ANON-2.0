import React from 'react'
import { Link } from 'react-router-dom'
import CreateStoryLayout from './CreateStoryLayout'
import SignIn from './SignIn';
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import SignOut from './SignOut';
import { toggleMobileNav, resetView } from '../../store/actions/navActions'

const Navbar = (props) => {
    const {auth, nav, Ids} = props; 
    // console.log(auth.uid);
    // console.log(props);
    const mobile_nav = nav.mobileToggled ? 'mobile_nav' : 'mobile_nav-noDisplay';
    return (
        <nav className="top_section">
            <div className="logo" onClick={props.resetView}>
                <Link to='/' className="left"><h1>ANON</h1></Link>
            </div>

            <div className="nav_items">
                <CreateStoryLayout />
                <SignIn userInfo={{ auth, Ids }} />
            </div>
            <div className="mobile_nav_button" onClick={props.toggleMobileNav}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className={mobile_nav} onClick={props.toggleMobileNav}>
                <SignIn userInfo={{auth, Ids}} />
                <CreateStoryLayout />
            </div>
        </nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMobileNav: () => dispatch(toggleMobileNav()),
        resetView: () => dispatch(resetView()),
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        nav: state.nav,
        Ids: state.firestore.data.Ids,
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'Ids' }
    ])
)(Navbar)