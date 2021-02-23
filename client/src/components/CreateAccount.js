import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthDataConnector from "../services/AuthDataConnector";

class CreateAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            confirm: "",
            pwerror: "",
            emailerror: ""
        };

        this.handleChange = this.handleChange.bind(this);

    }

    cancel = () =>{
        window.location.reload()
        this.props.history.push('/') // go back to the login screen
        
    };

    submit = (event) =>{
        event.preventDefault();

        //validate email and password
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)){
            this.setState({emailerror: ' is-invalid'})
            return
        } else {
            this.setState({emailerror: ' is-valid'})
        }

        if (this.state.password !== this.state.confirm){
            this.setState({pwerror: " is-invalid"})
            return
        } else {
            this.setState({pwerror: ' is-valid'})
        }

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        console.log(user);

        AuthDataConnector.addUser(user)
            .then((res) =>{
                console.log('User created', res)
                this.props.history.push('/dashboard')
                window.location.reload()
            })
            .catch((err) => {
                console.log('Could not add user', err.response)
            });
    }

    handleChange(event){
        //get input that changed, set state = that value
        const input = event.target
        const value = input.value
        const name = input.name
        
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center mt-3">Create Account</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group has-validation">
                                        <label>Username</label>
                                        <input placeholder="Username" name="username" className={"form-control"+this.state.uerror} type="text" required
                                           onChange={this.handleChange}/>
                                           
                                        <div className="invalid-feedback">
                                            Invalid username.
                                        </div>
                                    </div>
                                    <div className="form-group has-validation">
                                        <label>Email</label>
                                        <input placeholder="Email" name="email" className={"form-control"+this.state.emailerror} type="email" required
                                           onChange={this.handleChange}/>
                                           
                                        <div className="invalid-feedback">
                                            Invalid email format.
                                        </div>
                                    </div>

                                    <div className="form-group has-validation">
                                        <label>Password</label>
                                        <input type="password" placeholder="Password" name="password" className={"form-control"+this.state.pwerror} required
                                            onChange={this.handleChange}/>
                                            <div className="invalid-feedback">
                                                Passwords do not match.
                                            </div>
                                    </div>

                                    <div className="form-group has-validation">
                                        <label>Confirm Password</label>
                                        <input type="password" placeholder="Confirm password" name="confirm" className={"form-control"+ this.state.pwerror} required
                                            onChange={this.handleChange}/>
                                            <div className="invalid-feedback">
                                                Passwords do not match.
                                            </div>
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-success btn-block" onClick={this.submit}>
                                            Create My Account
                                        </button>
                                    </div>

                                    <div className="form-group">
                                        {/* <button className="btn btn-warning btn-block" onClick={this.cancel}>Cancel</button> */}
                                        <Link to="/" className="btn btn-warning btn-block">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default CreateAccount
