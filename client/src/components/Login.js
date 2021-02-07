import React, { Component } from "react";
import AuthDataConnector from "../services/AuthDataConnector";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: React.createRef(),
            password: React.createRef()
        };

        this.signup = () =>{
            this.props.history.push('/signup')
        };

        this.submit = (event) =>{
            event.preventDefault();
            const credentials = {
                email: this.state.email.current.value,
                password: this.state.password.current.value
            };

            AuthDataConnector.getAuth(credentials)
                .then((res) =>{
                    console.log('logged in', res) // todo: change this to store cookie on success
                })
                .catch(err => {
                    console.log(err)
                });

            console.log(credentials)
        }

    }

    render() {
        return (
            <div className="container">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">Login</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input placeholder="Email" name="email" className="form-control"
                                       ref={this.state.email}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input placeholder="Password" name="password" type="password" className="form-control"
                                       ref={this.state.password}/>
                            </div>

                            <div className="form-group">
                                <span className="mr-3">Don't have an account?</span>
                                <button className="btn btn-link" onClick={this.signup}>Sign Up</button>
                            </div>

                            <div className="form-group text-center">
                                <button className="btn btn-success btn-block" onClick={this.submit}>Login</button>
                                {/*<button className="btn btn-danger m-2 btn-block" onClick={this.cancel.bind(this)}>Cancel</button>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default Login
