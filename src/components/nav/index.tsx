import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './nav.scss';

const Nav = () => {
    return (
        <div className="nav">
            <Link to="/"><img className="logo" src={logo} alt="logo"/></Link>
            <Link to="/">restaurants</Link>
            <Link to="/">products</Link>
            <Link to="/">newsletter</Link>
            <Link to="/">contact</Link>
        </div>
    );
}

export default Nav;