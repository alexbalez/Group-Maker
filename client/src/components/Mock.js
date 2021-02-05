import React, { Component } from 'react';
import './components.css';

class Mock extends Component {
    constructor(){
        super();
        this.state = {
            students : [],
            student : {}
        }
    }

    componentDidMount(){
        // GET ALL STUDENTS
        fetch('/students')
            .then(res => res.json())
            .then(students => this.setState({students: students}, () => console.log('students: ', students)));
    }

    render(){
        return (
            <div>
                <h2>Students:</h2>
                {this.state.students.map(student =>
                    <p>{student.name} - {student.email} - {student.semester}</p>
                )}
            </div>
        );
    }


}

export default Mock;
