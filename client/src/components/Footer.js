import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./components.css";
import { Container, Row, Col } from "react-bootstrap";

class Footer extends Component {

  render() {
    return (
      <Container fluid className="bg-primary text-white footer">
        <Row className="p-2">
          <Col className="d-none d-sm-block m-0 p-0"></Col>
          <Col className="text-center">&copy;2021 Group Maker</Col>
          <Col className="text-right">
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
