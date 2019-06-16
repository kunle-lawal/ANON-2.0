import React from 'react'
import { NavLink } from 'react-router-dom'

const CreateStoryLayout = (props) => {
    return (
        <div className="item-container">
            <div className="write item">
               
                <NavLink to='/create'> <i class="fas fa-pencil-alt"></i></NavLink>
            </div>
        </div>
    )
}

export default CreateStoryLayout