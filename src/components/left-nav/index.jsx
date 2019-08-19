import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../pages/login/images/logo.png'
import './index.less'
import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig'

const { SubMenu, Item } = Menu;


class LeftNav extends Component {


    getMenuList = (menuList) => {
        // 获取path
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            // 向pre中添加item
            if (!item.children) {
                pre.push(
                    <Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                )
            } else {
                // 当前item的children中某个item的key与当前请求的path相同, 当前item的key就是openKey
                const cItem = item.children.find((cItem) => path.indexOf(cItem.key)===0)
                if (cItem) {
                    this.openKey = item.key
                }
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuList(item.children)
                        }
                    </SubMenu>
                )
            }

            return pre
        }, [])
    }

    componentWillMount () {
        this.menuNodes = this.getMenuList(menuList)
      }

    render() {
        let path = this.props.location.pathname
        if (path.indexOf('/product/')===0) {
            path = '/product'
        }
        return (
            <div className='left-nav'>
                <Link to="/home">
                    <div className='header'>
                        <img src={logo} alt="logo" />
                        <h1>硅谷后台</h1>
                    </div>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys = {[path]}
                    defaultOpenKeys= {[this.openKey]}
                >
                    {
                        this.menuNodes
                    }                  
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)
