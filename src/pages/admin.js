import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavLeft from '../components/NavLeft'
// import Home from './home'
import '../style/common.less'
class App extends Component {
  render() {
    return (
      <div className="container">
        <Row>
          <Col span={4} className="nav-left">
            <NavLeft />
          </Col>
          <Col span={20} className="main">
            <Header />
            <Row className="content">
            { this.props.children }
            </Row>
            <Footer />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App