import React from 'react';
import { link, NavLink } from 'react-router-dom';

import logo from '../../img/Netflix.svg';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="nav-wrapper valign-wrapper">
                <NavLink to="/" className="left"><img src={logo} alt="netflix logo"/></NavLink>
                
                <ul className="nav-bar">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/series">Series</NavLink></li>
                    <li><NavLink to="/films">Films</NavLink></li>
                    <li><NavLink to="/newandpopular">New &#38; popular</NavLink></li>
                    <li><NavLink to="/mylist">My list</NavLink></li>
                </ul>

                <ul className="options right">
                    <li><span className="material-icons">search</span></li>
                    <li><span className="material-icons">card_giftcard</span></li>
                    <li><span className="material-icons">notifications</span></li>
                </ul>
            </nav>
        )
    }

    componentDidMount() {
        document.querySelector(".App-content").addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        document.querySelector(".App-content").removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        var scrolled = document.querySelector(".App-content").scrollTop

        if (scrolled > 20) {
            document.querySelector(".nav-wrapper").className = "nav-wrapper valign-wrapper scroll";
        } else {
            document.querySelector(".nav-wrapper").className = "nav-wrapper valign-wrapper";
        }
    };
}

export default NavBar;