import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="page-footer">
            <div className="container">
                <div className="col">
                    <ul>
                        <a href=""><li>About</li></a>
                        <a href=""><li>Cookie policy</li></a>
                        <a href=""><li>Terms</li></a>
                        <a href=""><li>Privacy</li></a>
                        <li>© 2019</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer