import React, { Component } from 'react'
import '../components.css'
import axios from 'axios'
import {Spinner} from 'react-bootstrap'

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
            const litems = values.map((item, index) => 
                <li key={index}>{item.data.username}</li>
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
            <ul>{this.state.list.length !==0 ? this.state.list : <Spinner animation="border" variant='primary'/>}</ul>
        )
    }
}

export default UserList