import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './nav.scss';

const Nav = () => {
    return (
        <div className="nav">
            <Link to="/"><img className="logo" src={logo} alt="logo"/></Link>
            <Link className="menu-item" to="/">restaurants</Link>
            <Link className="menu-item" to="/">products</Link>
            <Link className="menu-item" to="/">newsletter</Link>
            <Link className="menu-item" to="/">contact</Link>
        </div>
    );
}

export default Nav;