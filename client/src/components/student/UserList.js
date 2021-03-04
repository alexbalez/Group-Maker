import React, { Component } from 'react'
import '../components.css'
import axios from 'axios'

class UserList extends Component{

    constructor(props){
        super(props)
        this.state = {
            users: props.users,
            list: ""
        }
    }

    updateList = () => {
        const users = this.state.users
        console.log("users",users)
        const items = users.map((user) => 
            <li key={user.toString()}>
                {user.toString()}
            </li>
        )
        this.setState({list: items})
        return items
    }

    componentDidMount(){
        this.updateList()
    }

    render(){
        return(
            <ul>{this.state.list}</ul>
        )
    }
}

export default UserList