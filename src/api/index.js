/* 包含所有请求接口 的模块 */


import ajax from './ajax'


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