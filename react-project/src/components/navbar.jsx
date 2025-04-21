
import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import './navbar.css';

export const Navbar = () => {
    return (
        <div>
            <nav>
                <Link to='/' className='title'>Home</Link>
                <ul>
                    <li><NavLink to='/about'>About Us</NavLink></li>
                    <li><NavLink to='/contact'>Contact</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}