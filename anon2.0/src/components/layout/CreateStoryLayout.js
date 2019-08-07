import React from 'react'
import { NavLink } from 'react-router-dom'

const CreateStoryLayout = (props) => {
    return (
        <div className="item-container">
            <NavLink to='/create'>
                <div className="write item">
                    <i className="fas fa-pencil-alt"></i>
                </div>
            </NavLink>
        </div>
    )
}

export default CreateStoryLayout