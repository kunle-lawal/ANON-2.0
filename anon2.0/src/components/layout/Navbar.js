import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import CreateStoryLayout from './CreateStoryLayout'
import SignIn from './SignIn'
import SignUp from './SignUp'
import MyProfile from './MyProfile'
import FullNav from './FullNav'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { toggleMobileNav, resetView, openFullNav, closeFullNav, toggleFullNav } from '../../store/actions/navActions'
import { showAuthModule } from '../../store/actions/authActions'
import { signOut } from '../../store/actions/authActions'

const Navbar = (props) => {
    const {auth, nav, Ids, profileData} = props; 
    const mobile_nav = nav.mobileToggled ? 'mobile_nav' : 'mobile_nav-noDisplay';
    const toggle_mobile_nav = nav.mobileToggled ? 'animate' : '' 
    return (
        <div className="top_section">
            <div className="nav_top center nav">
                <MyProfile userInfo={{ auth, Ids, profileData }}/>
                <div className="nav_top-items">
                    {auth.isEmpty ? (<><SignIn userInfo={{ auth, Ids }} /><SignUp /></>) : 
                        <div></div>
                    }
                </div>
            </div>
            <div className=" main_nav">
                <div className="logo" onClick={props.resetView}>
                    <Link to='/' className="left"><h1 className="logo">Tech Talk</h1></Link>
                </div>

                {(auth.uid) ? (
                    <div className="nav_items">
                        <CreateStoryLayout text={'Write Story'} />
                        <div className="item-container" onClick={props.toggleFullNav}>
                            <div className="write item">
                                <i className="fas fa-bars"></i>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="nav_items">
                        <div className="item-container">
                            <div className="write item">
                                    <i className="fas fa-pencil-alt" onClick={props.showAuthModule}></i>
                            </div>
                        </div>
                        <div className="item-container">
                            <div className="write item">
                                    <i className="far fa-user" onClick={props.showAuthModule}></i>
                            </div>
                        </div>
                    </div>
                )}

                <div className={"mobile_nav_button item " + toggle_mobile_nav} onClick={() => { props.closeFullNav(); props.toggleMobileNav()}}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div className={mobile_nav} onClick={props.toggleMobileNav}>
                {auth.isEmpty ? (<><SignIn userInfo={{ auth, Ids }} /><SignUp /></>) :
                    null
                }
                <div className="item-container">
                    <div className="write item">
                        <NavLink to='/create'> 
                            <h3>Create</h3>
                        </NavLink>
                    </div>
                </div>

                <div className="item-container" onClick={props.toggleFullNav}>
                    <div className="write item">
                        <h3>Topics</h3>
                    </div>
                </div>

                <div className="item-container">
                    <div className="write item">
                        <NavLink to='/profile'><div className="black-text item"><h3> My Profile</h3></div></NavLink>
                    </div>
                </div>

                <div className="item-container">
                    <div className="write item">
                        <NavLink to='/myactivity'><div className="black-text item"><h3> My Activity</h3></div></NavLink>
                    </div>
                </div>

                <div className="item-container">
                    <div className="write item">
                        <NavLink to='/bookmarks'><div className="black-text item"><h3> Bookmarks</h3></div></NavLink>
                    </div>
                </div>
                <hr className="red"/>
                <div className="item-container">
                    <div className="write item">
                        {/* <div className="black-text item"><p>Activity</p></div>
                                    <div className="black-text item"><p>Bookmarks</p></div> */}
                        <div className="black-text item" onClick={props.signOut}><h3 className="red-text">Log Out</h3></div>
                    </div>
                </div>
            </div>

            {(auth.uid) ? (
                <FullNav userInfo={{ auth }} />
            ) : (
                undefined
            )}
        </div>
    )
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMobileNav: () => dispatch(toggleMobileNav()),
        resetView: () => dispatch(resetView()),
        showAuthModule: () => dispatch(showAuthModule()),
        openFullNav: () => dispatch(openFullNav()),
        closeFullNav: () => dispatch(closeFullNav()),
        toggleFullNav: () => dispatch(toggleFullNav()),
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        nav: state.nav,
        Ids: state.firestore.data.Ids,
        data: state.firestore.data,
        profileData: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'Ids' }
    ])
)(Navbar)