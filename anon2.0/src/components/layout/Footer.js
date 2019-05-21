import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    // var location = window.location.pathname;
    if (window.location.pathname.includes('admin')) {
        return (
            <div className="page-footer black">
                <div className="container">
                    <div className="col">
                        <ul className='white-text'>
                            <a href=""><li className='white-text'>About</li></a>
                            <a href=""><li className='white-text'>Cookie policy</li></a>
                            <a href=""><li className='white-text'>Terms</li></a>
                            <a href=""><li className='white-text'>Privacy</li></a>
                            <li>© 2019</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
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
}

export default Footer