import React from 'react'
import { NavLink } from 'react-router-dom'

const CreateStoryLayout = (props) => {
    return (
        <div className="write-container">
            <div className="write">
                <NavLink to='/create'><h3>Write Story</h3></NavLink>
            </div>
        </div>
    )
}

export default CreateStoryLayout