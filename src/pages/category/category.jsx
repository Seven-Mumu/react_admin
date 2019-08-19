import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'
import LinkButton from '../../components/link-button/linkButton'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api';

import CategoryForm from "./category-form";
/**
 * 分类管理
 */

export default class Category extends Component {

  state = {
    categorys: [], //所有分类的数组
    loading: false,
    showStatus: 0,// 0:不显示  1：显示添加  2：显示修改
  }

  // 初始化table所有的列信息
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 200,
        render: (category) => <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>,
      }
    ];
  }

  getCategorys = async () => {
    // 获取数据前显示loading
    this.setState({
      loading: true
    })
    const result = await reqCategorys()
    // 获取完数据隐藏loading
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      const categorys = result.data
      //  更新数据
      this.setState({
        categorys
      })
    } else {
      message.error('获取分类列表失败')
    }
  }


  /* 点击确定的回调   添加/修改 */
  addCategory = () => {
    // 表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {

        // 清空input的value
        this.form.resetFields()

        // 验证通过，得到输入的数据
        const { categoryName } = values
        // 添加分类的ajax请求
        const result = await reqAddCategory(categoryName)
        // 让对话框消失
        this.setState({
          showStatus: 0
        })
        // 根据响应做不同的处理
        if (result.status === 0) {
          // 重新获取分类列表
          this.getCategorys()
          message.success('添加分类成功')
        } else {
          message.error('添加分类失败' + result.msg)
        }
      }
    }
    )
  }

  /* 点击 修改分类  更新修改分类 */
  updateCategory = () => {
    // 表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 清空input的value
        this.form.resetFields()
        // 发送请求
        const categoryId = this.category._id
        const categoryName = values.categoryName
        const result = await reqUpdateCategory({categoryId, categoryName})
        // 让对话框消失
        this.setState({
          showStatus: 0
        })
        // 根据响应做不同的处理
        if (result.status === 0) {
          // 重新获取分类列表
          this.getCategorys()
          message.success('修改分类成功')
        } else {
          message.error('修改分类失败' + result.msg)
        }
      }
    }
    )


  }


  /* 点击取消的回调 */
  handleCancel = () => {

    // 清空input的value
    this.form.resetFields()

    this.setState({
      showStatus: 0
    })
  }

  /* 为了接收子组件传递过来的form */
  setForm = (form) => {
    /*将传递过来的form保存在this中 */
    this.form = form
  }
  /* 点击修改分类  显示对话框 */
  showUpdate = (category) => {
    this.category = category
    this.setState({ showStatus: 2 })
  }




  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }


  render() {
    const { categorys, loading, showStatus } = this.state

    // 取出当前需要修改的分类
    const category = this.category  || {}  //空对象避免初始渲染报错


    // card右上角的结构
    const extra = (
      <Button type='primary' onClick={() => this.setState({ showStatus: 1 })}>
        <Icon type='plus' />
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
        <Table
          columns={this.columns}
          dataSource={categorys} //要显示的列表数据
          bordered
          pagination={{ defaultPageSize: 6, showQuickJumper: true }}
          rowKey='_id'
          loading={loading}
        />,

        <Modal
          title={"添加分类"}
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >

          <CategoryForm setForm={this.setForm} />
        </Modal>

        <Modal
          title={"修改分类"}
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >

          <CategoryForm categoryName={category.name} setForm={this.setForm} />
        </Modal>

      </Card>
    )
  }
}
