import React from 'react';
import { link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <a className="brand-logo left">netflix</a>
                <ul className="right">
                    <li><NavLink to="/">home</NavLink></li>
                    <li><NavLink to="/series">series</NavLink></li>
                    <li><NavLink to="/films">films</NavLink></li>
                    <li><NavLink to="/newandpopular">new and popular</NavLink></li>
                    <li><NavLink to="/mylist">my list</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;