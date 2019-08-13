import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'

import {saveUser} from '../../utils/storageUtils'
import './login.less'
import logo from './images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils';
/* 
    登录路由组件
*/
class LoginForm extends Component {


    handleSubmit = e => {
        e.preventDefault();
        /* 统一验证表单数据 */
        this.props.form.validateFields(async (err, values) => {
            console.log(values);
            if (!err) { //验证通过  发送ajax请求
                // alert('校验成功')
                const result = await reqLogin(values)
                console.log(result);
                if (result.status === 0) { // 登录请求成功
                    //  得到user
                    const user = result.data
                    // console.log(user);
                    // 保存user
                    // 保存到local
                    // localStorage.setItem('user_key',JSON.stringify(user))
                    saveUser(user)
                    // 保存到内存
                    memoryUtils.user = user
                    // 跳转到admin   location/match/history
                    this.props.history.replace('/')
                } else {// 登录请求失败
                    message.error(result.msg)
                }
            }
        })
    }
    /*用户名/密码的的合法性要求
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成
 */
    validatorPassword = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback('请输入密码!')
        } else if (value.length < 4) {
            callback('密码不能少于四个字符!')
        } else if (value.length > 12) {
            callback('密码不能大于十二个字符!')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('用户名必须是英文、数字或下划线组成!')
        } else {
            callback()
        }
    }

    render() {
        // 如果已经登录，自动跳转到admin
        if (memoryUtils.user._id) {
            return <Redirect to="/"></Redirect>
          }



        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                initialValue: 'admin',
                                rules: [
                                    { required: true, whitespace: true, message: '请输入用户名!' },
                                    { min: 4, message: '用户名不能少于四个字符!' },
                                    { max: 12, message: '用户名不能大于十二个字符!' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{ validator: this.validatorPassword }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default WrappedNormalLoginForm


