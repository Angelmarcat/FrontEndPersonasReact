import React from "react";
import logo from '../assets/images/logo.svg'

const Header = () => {
 return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-darck bg-dark">
        <div className="container"></div>
        <img className="App-logo" src={logo} alt="logo" width="80" />
    </nav>
 )
}

export default Header;