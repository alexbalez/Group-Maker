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
        const resolved = []
        const promises = users.map((user) => {
            /*axios.get('/user/'+user)
            .then((res)=> {
                resolved.push(res.data.username) // change later to prettify userlist? profile link?
                return res.data.username
            }, (err) => {
                console.log(err)
            })*/
            var res = axios.get('/users/'+user)
            return res
        })

        //wait until all users have resolved, then update component
        Promise.all(promises).then(()=>{
            this.setState({usersresolved: resolved})
            var items = this.state.usersresolved
            console.log("users res:", this.state.usersresolved)
            console.log(items.length)
            //WHY DOES THIS MAP NOT WORK
            const litems = items.map((item) => {
                <li>{item}</li>
            })
            console.log("after", litems)
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