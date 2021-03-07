import React, { Component } from 'react'
import '../components.css'
import axios from 'axios'

class UserList extends Component{

    constructor(props){
        super(props)
        this.state = {
            users: props.users,
            list: [],
            usersresolved: [],
            resolved: false,
        }
    }

    resolveUsers = (users) => {
        // ids -> usernames
        const promises = users.map((user) => {
            var res = axios.get('/user/'+user)
            return res
        })

        //wait until all users have resolved, then update component
        Promise.all(promises).then((values)=>{
            const litems = values.map((item) => 
                <li>{item.data.username}</li>
            )
            this.setState({list: litems})     
            this.setState({resolved: true})
        })
    }

    componentDidMount(){
        if (!this.state.resolved){
            this.resolveUsers(this.state.users)
        }
    }

    render(){
        return(
            <ul>{this.state.list}</ul>
        )
    }
}

export default UserList