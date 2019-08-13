// 操作localStorage的模块



/* 保存user */
export const saveUser = (user) => localStorage.setItem('user_key', JSON.stringify(user))


/* 读取user */
export const getUser = () =>  JSON.parse(localStorage.getItem('user_key') || '{}')
