import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../components.css';
import UserList from './UserList';
import axios from 'axios'
import QRcode from 'qrcode.react'

class GroupModal extends Component {

    constructor(props){
        super(props)
        this.state = {
            groupJoinedStatus: false,
            class: 'btn btn-success',
            buttontext: "Join Group",
            runonce: false,
        }
    }

    setJoinedState = () => {
        // race condition ¯\_(ツ)_/¯
        if (this.props.data.users.includes(this.props.uid)) {
            //  you are, want to leave?
            this.setState({groupJoinedStatus: true})
            this.setState({class: 'btn btn-danger'})
            this.setState({buttontext: "Leave Group"})
        } else {
            this.setState({groupJoinedStatus: false})
            this.setState({class: 'btn btn-success'})
            this.setState({buttontext: "Join Group"})
        }
        
    }

    handleJoinGroup = (e) => {
        e.preventDefault()
        //if in group, leave, else join
        //working, but button state doesn't update yet
        if (this.state.groupJoinedStatus){
            axios.post('/usergroupdelete/'+this.props.uid+'/'+this.props.data._id) 
            .then((res) => {
                this.setJoinedState()
                this.props.toggle()
            }, (err) => {
                console.log(err)
            })
        } else {
            axios.post('/usergroupadd/'+this.props.uid+'/'+this.props.data._id) 
            .then((res) => {
                this.setJoinedState()
                this.props.toggle()
            }, (err) => {
                console.log(err)
            })
        }
    }

    componentDidUpdate(){

        //join/leave button
        if(this.props.data.users && this.props.show){
            // console.log('shown and data!')
            // console.log('uid:', this.props.uid, 'users', this.props.data.users)
            if(!this.state.runonce){
                this.setJoinedState()
                this.setState({runonce: true})
            }
        } else {
            if(this.state.runonce){
                this.setJoinedState()
                this.setState({runonce: false})
            }
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle} onEntered={this.modalShown}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class='container'>
                        <div class='row'>
                            <div class='col-auto mr-auto'>

                                <p>College: {this.props.data.college}</p>
                                <p>Campus: {this.props.data.campus}</p>
                                <p>Program: {this.props.data.program}</p>
                                <p>Course: {this.props.data.course}</p>
                                <p>Project: {this.props.data.project}</p>
                                <p>Preferences: {this.props.data.preferences}</p>
                                <p>In this group:</p>
                                {/** need to check if users are loaded before listing */}
                                { this.props.data.users ? <UserList users={this.props.data.users} /> : null}
                                <hr/>
                                <p>{this.props.data.description}</p>
                                <hr/>
                            </div>
                            <div class='col-auto'>
                                {this.props.data._id ? <QRcode value={this.props.data._id} /> : null}
                            </div>
                        </div> 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.toggle}>
                        Cancel
                            </button>
                    <button className={this.state.class} onClick={this.handleJoinGroup}>
                        {this.state.buttontext}
                            </button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default GroupModal;
