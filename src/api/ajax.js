/* 用来发送ajax请求的模块
    包装的就是axios ==> 向外暴露本质就是axios
  1). 将post请求的data对象数据转换为urlencoded格式的字符串数据 ==> 请求拦截器 (后台接口不能处理json格式请求参数)
  2). 请求成功得到的不是response, 而是response.data  ===> 响应拦截器(使用成功回调)
  3).统一处理请求异常, 外部调用者不用再处理请求异常 === > 响应拦截器(使用失败回调)
*/

import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

/* 请求拦截器 */

axios.interceptors.request.use((config) => {
    /* 将post请求的请求体参数对象（data）转换成urlencoded的字符串形式 */
    if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
        config.data = qs.stringify(config.data)
    }
    /* if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
      } */
    return config
})

/* 响应拦截器 */

axios.interceptors.response.use(
    (response) => { // 请求成功了,请求成功得到的不是response, 而是response.data
        return response.data
    },
    (error) => { //请求失败了,这里的失败是请求异常，统一处理请求异常, 外部调用者不用再处理请求异常
        message.error('请求失败' + error.message)
        /* 这里可以直接返回一个 pending状态的promise对象  目的是中断promise链 */
        return new Promise(() => {})
    }

)

export default axios