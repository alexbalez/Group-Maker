import React, { Component } from "react";
import AuthDataConnector from "../services/AuthDataConnector";
import { Link } from "react-router-dom";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };

        this.handleChange = this.handleChange.bind(this);

        this.signup = () =>{
            this.props.history.push('/signup')
        };

        this.submit = (event) =>{
            event.preventDefault();
            this.setState({error: ""})
            const credentials = {
                email: this.state.email,
                password: this.state.password
            };

            AuthDataConnector.getAuth(credentials)
                .then((res) =>{
                    //can get userid from server response
                    console.log('Login successful.', 'User id: '+res.data.userid)
                    console.log(res)
                    this.props.history.push('/dashboard')
                    window.location.reload() //reload page so navbar disappears
                })
                .catch(err => {
                    //todo: code error fields in form that use this err.response object
                    console.log('Could not login.', err.response)
                    this.setState({error: " is-invalid"})
                });
        }

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
                    <div className='row'>
                        <div className="col">
                            <h2>Find groups that fit your needs.</h2>
                            <br/>
                            <p>Enter your skills and be automatically matched with a group that's looking for someone like you, or start a group and watch it fill with quality people.</p>
                            <br/>
                            <p>Set your preferred toolsets and find people who match your workflow.</p>
                            <br/>
                            <p>Quickly start communicating with your teams by matching the chat services you use.</p>
                        </div>
                        <div className="col">
                            <div className="card">
                                <h3 className="text-center mt-3">Login</h3>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group has-validation">
                                            <label>Email</label>
                                            <input placeholder="Email" name="email" className={"form-control"+this.state.error} type="email"
                                                onChange={this.handleChange} />

                                                <div className="invalid-feedback">
                                                    Email or password incorrect.
                                                </div>
                                        </div>

                                        <div className="form-group has-validation">
                                            <label>Password</label>
                                            <input placeholder="Password" name="password" type="password" className={"form-control"+this.state.error}
                                                onChange={this.handleChange} />

                                                <div className="invalid-feedback">
                                                    Email or password incorrect.
                                                </div>
                                        </div>

                                        <div className="form-group text-center">
                                            <span className="mr-3">Don't have an account?</span>
                                            <Link to="/signup" >Sign Up</Link>
                                        </div>

                                        <div className="form-group text-center">
                                            <button className="btn btn-success btn-block" onClick={this.submit}>Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Login
