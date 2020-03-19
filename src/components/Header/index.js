import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less'
import Utils from '../../utils/utils'
import Axios from '../../axios/index';
export default class Header extends Component {
  state = {}
  componentWillMount() {
    this.setState({
      username: '河不语'
    })
    setInterval(() => {
      let sysTime = Utils.getFarmetDate(new Date().getTime())
      this.setState({
        sysTime
      })
    }, 1000)
    this.getWeatherDate()
  }
  getWeatherDate() {
    const city = '北京'
    Axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=nSIGqWxYTgccIuX9QoMjg9mH8A2xg1F8'
    }).then((res, err) => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0]
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    }).catch(err => {
      console.error(err)
    })
  }
  render() {
    const { username, sysTime, dayPictureUrl, weather } = this.state
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24} >
            <span>欢迎，{username} </span>
            <a href="###">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date"> {sysTime} </span>
            <span className="weather-img">
              <img src={dayPictureUrl} alt=""/>
            </span>
            <span className="weather-detail">
              {weather}
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}
