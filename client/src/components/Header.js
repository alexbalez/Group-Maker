import React, { Component } from "react";
import logo from '../logo.svg';

export default class Header extends Component {

    render() {
        return (

            <nav className="navbar navbar-dark bg-dark App-header">
                <a className="navbar-brand" href="/">Employee Management App</a>
                <img src={logo} className="App-logo" alt="logo" />
            </nav>

        )
    }
}
