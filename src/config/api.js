import { myPost,myGet,myDelete,myPut } from './axios'

//  登录
export const login = p => myPost('/login/phone', p);

// 用户信息
// export const accountList = p => myGet('/admin/user/list',{params: p})

// 利率设置
// export const accountRate = p => myPost('/user/settlement/charge', p);

//  登出
export const loginOut = () => myDelete('/own')

//  提现审核
export const auditList = p => myGet('/cash/list',{params: p})

//  到账
export const auditOk = p => myPost('/cash/manual', p);

// 提现系统代付
export const cashSys = p => myPost('/cash/sys', p);

// 商户信息
export const merList = p => myGet('/mch/list',{params: p})

//系统应用
export const sysApp = p => myGet('/sys/app',{params: p})

//新增系统应用
export const addSysApp = p => myPost('/sys/app', p);

//修改系统应用
export const changeSysApp = p => myPut('/sys/app', p);

//修改商户审核信息
export const changeMerDetail = p => myPut('/user/base', p);

//自定义费率
export const zdyRate = p => myPost('/mch/app', p);

//商户应用信息
export const merAppRate = p => myGet('/mch/app',{params: p})

// 移除商户应用信息
export const delAppRate = p => myDelete('/mch/app',{params: p})

//  今日账单数据
export const todayNum = p => myGet('/bill/today',{params: p})

//  账单明细
export const billList = p => myGet('/bill',{params: p})

//  图标数据
export const chartData = p => myGet('/stats',{params: p})

// 主页数据统计
export const statsTotal = p => myGet('/stats/total',{params: p})

// 补单
export const reissue = p => myPost('/bill/reissue', p);

//回滚
export const rollback = p => myPost('/bill/reissue/rollback', p);

//激活、冻结商户
export const cutMchState = p => myPost('/mch', p);

//商户信息
export const merInfoList = p => myGet('/user/base',{params: p})

//通道列表
export const channelList = p => myGet('/channel/sys',{params: p})

//改变通道状态
export const changeChannelState = p => myPost('/channel/sys',p)

//改变商户通道
export const changeMchChannel = p => myPost('/channel/mch',p)

// 重置密码
export const resetMchPW = p => myPost('/mch/pwd',p)

// 代理商创建
export const creatAgent = p => myPost('/mch/agent',p)

// 修改代理商
export const changeAgent = p => myPut('/mch/agent', p);

//代理商列表
export const agentList = p => myGet('/mch/agent',{params: p})

// 查看子账户
export const childAgent = p => myGet('/auth/phone/sub',{params: p})

//关联两个商户
export const lineAgent = p => myPost('/auth/phone/sub',p)

//删除子账户
export const delChildAgent = p => myDelete('/auth/phone/sub/'+ p)

// 代付列表
export const payBankList = p => myGet('/bank/payment/sys',{params: p})

//改变代付状态
export const changePayBankState = p => myPost('/bank/payment/sys',p)

//审核通过
export const auditPass = p => myPost('/user/base/audit', p);

