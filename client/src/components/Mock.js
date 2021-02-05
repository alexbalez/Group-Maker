import React, { Component } from 'react';
import { Button, Nav, Form, FormControl } from 'react-bootstrap';
import './components.css';

class Mock extends Component {
    constructor(){
        super();
        this.state = {
            students : [],
            student : {},
            formFirstName: '',
            formLastName: '',
            formEmailAddress: ''
        };
    }

    // Used to get form input data
    formName = React.createRef();
    formEmail = React.createRef();
    formSemester = React.createRef();

    componentDidMount(){
        // GET ALL STUDENTS
        fetch('/students')
            .then(res => res.json())
            .then(students => this.setState({students: students}, () => console.log('students: ', students)));
    }

    handleAddTapped(){
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let body = JSON.stringify({name: this.formName.current.value, email: this.formEmail.current.value, semester: this.formSemester.current.value});

        fetch('/students-create', {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: body
        }).then((res) => {
            if(res.status === 200){
                alert(`Employee ${this.formName.current.value} added`); window.location.reload(false);
            }
            else{ alert("Something went wrong when adding the employee"); console.log(res);}
        });
    }

    render(){
        return (
            <div>
                <h2>Students:</h2>
                {this.state.students.map(student =>
                    <p>{student.name} - {student.email} - {student.semester}</p>
                )}

                {/* Form used to create student */}
                <Form inline>
                    <input ref={this.formName} className="mr-sm-2" type="text" placeholder="Name"/>
                    <input ref={this.formEmail} className="mr-sm-2" type="text" placeholder="Email"/>
                    <input ref={this.formSemester} className="mr-sm-2" type="text" placeholder="Semester"/>
                    <Button onClick={()=>{ this.handleAddTapped() }} variant="outline-info">Add</Button>
                </Form>
            </div>
        );
    }


}

export default Mock;
