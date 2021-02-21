import React, { Component } from 'react';
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
                        <a className="text-white" href="/about">About</a>
                        &nbsp;| &nbsp;
                        <a className="text-white" href="/contact">Contact Us</a>
                    </Col>
                </Row>
            </Container>

        );
    }


}

export default Footer;
