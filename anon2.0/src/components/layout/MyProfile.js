import React from 'react'
import { NavLink } from 'react-router-dom'

const MyProfile = (props) => {
    if (!props.userInfo.auth.uid) {
        return null;
    } else {
        return (
            <div className="write-container">
                <div className="right profileView">
                    <NavLink to='/profile'><i className="material-icons">person</i></NavLink>
                </div>
            </div>
        )
    }
}

export default MyProfile 