import React, { Component } from 'react'
import LinkButton from '../link-button/linkButton'
import { withRouter } from 'react-router-dom'
import { Modal } from "antd";
import { removeUser } from '../../utils/storageUtils'
import memoryUtils from "../../utils/memoryUtils"
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'

import './index.less'

class Header extends Component {

  // 初始化时间状态数据  天气状态数据
  state = {
    time: formateDate(Date.now()),
    dayPictureUrl:'',
    weather:''
  }


  //  退出登录
  logOut = () => {
    Modal.confirm({
      title: "Do you Want to exit?",
      onOk: () => {
        // 删除内存中保存的user和localStorage中保存的user
        removeUser()
        memoryUtils.user = {}
        // 跳转到login
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  // 获取时间
  getTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        time: formateDate(Date.now())
      })
    }, 1000);
  }

  // 获取天气
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  // 根据请求的path 显示对应的title
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title
      }else if(item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  componentDidMount() {
    this.getTime()
    this.getWeather()
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  

  render() {
    const { time, dayPictureUrl, weather } = this.state
    const title = this.getTitle()
    const user = memoryUtils.user
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <LinkButton onClick={this.logOut}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{time}</span>
            <img
              src={dayPictureUrl}
              alt="weather"
            />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header)
