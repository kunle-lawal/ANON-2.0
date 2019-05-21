import React from 'react'
import { NavLink } from 'react-router-dom'

const CreateStoryLayout = (props) => {
    return (
        <div className="write-container">
            <div className="write">
                <NavLink to='/create'><i className="material-icons">create</i></NavLink>
            </div>
        </div>
    )
}

export default CreateStoryLayout