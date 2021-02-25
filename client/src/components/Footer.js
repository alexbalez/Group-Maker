import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './components.css';
import { Container, Row, Col } from 'react-bootstrap'


class Footer extends Component {
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
    }

    render() {
        return (

            <Container fluid className="bg-primary text-white fixed-bottom" >
                <Row className="p-2">
                    <Col sm></Col>
                    <Col sm className="text-center">&copy;2021 Group Maker</Col>
                    <Col sm className="text-right">
                        <Link className="text-white" to="/about">About</Link>
                        &nbsp;| &nbsp;
                        <Link className="text-white" to="/contact">Contact Us</Link>
                    </Col>
                </Row>
            </Container>

        );
    }


}

export default Footer;
