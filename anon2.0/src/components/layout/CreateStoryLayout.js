import React from 'react'
import { NavLink } from 'react-router-dom'

const CreateStoryLayout = () => {
    return (
        <div className="write-container">
            <div className="write">
                <NavLink to='/create'><h3>My Story</h3></NavLink>
            </div>
        </div>
    )
}

export default CreateStoryLayout