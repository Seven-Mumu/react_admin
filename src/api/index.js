/* 包含所有请求接口 的模块 */


import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'


// const BASE = 'http://localhost:5000'
const BASE = ''
/* 登陆 */
export const reqLogin = ({password,username}) => ajax.post(BASE + '/login',{password,username})

/* 添加用户 */
/* export const reqAddUser = (user) => ajax({
    url: BASE + '/manage/user/add',
    method: 'POST',
    data: user
  }) */

  /* 获取天气信息 */
  export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject) => {
      jsonp(url,{},(err,data) => {
        if (!err && data.error === 0) {
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        }else {
          message.error('获取天气信息失败~~~')
        }
      })
    })
  }
  