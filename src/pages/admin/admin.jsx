import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import  memoryUtils  from '../../utils//memoryUtils'
// 后台管理路由组件
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // 如果没有登录  自动跳转到login
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                hello {user.username}
            </div>
        )
    }
}
