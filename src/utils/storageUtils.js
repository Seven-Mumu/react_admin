// 操作localStorage的模块
import store from 'store'


/* 保存user */
export const saveUser = (user) => store.set('user_key',user)
//localStorage.setItem('user_key', JSON.stringify(user))


/* 读取user */
export const getUser = () =>  {return store.get('user_key') || {}}
//JSON.parse(localStorage.getItem('user_key') || '{}')

/* 删除user */
export const removeUser = () => store.remove('user_key')