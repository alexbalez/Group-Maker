import React, { Component } from 'react';
import './components.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            customers: []
        };
    }

    componentDidMount() {
        fetch('/api/customers')
            .then(res => res.json())
            .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
            </div>
        );
    }
}

export default Login;
