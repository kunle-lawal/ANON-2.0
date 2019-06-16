import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import CreateStoryLayout from './CreateStoryLayout'
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { toggleMobileNav, resetView } from '../../store/actions/navActions'

const Navbar = (props) => {
    const {auth, nav, Ids, data} = props; 
    const mobile_nav = nav.mobileToggled ? 'mobile_nav' : 'mobile_nav-noDisplay';
    const toggle_mobile_nav = nav.mobileToggled ? 'animate' : '' 
    // console.log(auth);
    return (
        <div className="top_section">
            <div className="nav_top center nav">
                <div className="nav_top-items">
                    {auth.isEmpty ? <><SignIn userInfo={{ auth, Ids }} /><SignUp /></> : <SignOut />}
                </div>
            </div>
            
            <div className=" main_nav">
                <div className="logo" onClick={props.resetView}>
                    <Link to='/' className="left"><h1 className="logo">Tech Talk</h1></Link>
                </div>

                <div className="nav_items">
                    <CreateStoryLayout text={'Write Story'} />
                    <div className="item-container">
                        <div className="write item">

                            <NavLink to='/profile'> <i class="far fa-user"></i></NavLink>
                        </div>
                    </div>
                </div>

                <div className={"mobile_nav_button item " + toggle_mobile_nav} onClick={props.toggleMobileNav}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div className={mobile_nav} onClick={props.toggleMobileNav}>
                <SignIn userInfo={{ auth, Ids }} />
                <CreateStoryLayout text={'Write Story'} />
            </div>
        </div>
    )
    
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