
import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import './navbar.css';

export const Navbar = () => {
    return (
        <div>
            <nav>
                <li><Link to='/' className='title'>Home</Link></li>
                <ul>
                    <li><NavLink to='/course' className="fs-3"> Courses</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export const Footer = () => {
    return (
        <div className='footer'>&copy; copyright FinalProjetGroup3 </div>
    )
}