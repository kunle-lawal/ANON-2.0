import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = (props) => {
    return (
        <div className="center-align large page_not_found_container">
            <div className="page_not_found">
                <h1>404</h1>
                <h4>Page not found</h4>
                <p> The page you are looking for does not exist anywhere on our servers. Not sure how you got here but lets get you  <NavLink className="center" to="/"> <span className="">Home</span> </NavLink></p>
            </div>
        </div>
    )
}

export default PageNotFound 