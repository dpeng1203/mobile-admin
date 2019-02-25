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

//审核通过
export const auditPass = p => myPost('/user/base/audit', p);


//修改商户审核信息
export const changeMerDetail = p => myPut('/user/base', p);

//自定义费率
export const zdyRate = p => myPost('/mch/app', p);

//商户应用信息
export const merAppRate = p => myGet('/mch/app',{params: p})

// 移除商户应用信息
export const delAppRate = p => myDelete('/mch/app',{params: p})

//  今日账单数据
// export const todayNum = p => myGet('/bill/today',{params: p})

// 交易金额统计
export const moneySum = p => myGet('/bill/count',{params: p})

// 先锋账户余额
export const xfMoneySum = () => myGet('/pay/xf/balance')



//关键字查询
export const getMch = p => myGet('/user/base/mchName/' + p)

//  充值明细
export const billList = p => myGet('/bill',{params: p})

//  代付明细
export const payList = p => myGet('/bankpay',{params: p})

// 导出账单明细
export const billExcel = p => myGet('/bill/export',{params: p})

//  图标数据
export const chartData = p => myGet('/stats',{params: p})

// 主页数据统计
export const statsTotal = p => myGet('/stats/total',{params: p})

//主页元饼图数据
export const picData =  (p,n) => myGet('/stats/category/' + p, {params: n})

//分润统计
export const bonusStat = (p,n) => myGet('/stats/bonus/' + p, {params: n})

// 补单
export const reissue = p => myPost('/bill/reissue', p);

//回滚
export const rollback = p => myPost('/bill/reissue/rollback', p);

//发起回调
export const notify = p => myGet('/pay/manual/notify',{params: p})

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

//代理充值
export const recharge = p => myPost('/wallet/recharge',p)

//设置商户代付费率
export const payRate = p => myPost('/bankpay/mch/rate',p)

//查看代付费率
export const getPayRate = p => myGet('/bankpay/mch/rate',{params: p})

// 代理商创建
export const creatAgent = p => myPost('/mch/agent',p)

// 修改代理商
export const changeAgent = p => myPut('/mch/agent', p);

//代理商列表
export const agentList = p => myGet('/mch/agency',{params: p})

// 查看子账户
// export const childAgent = p => myGet('/auth/phone/sub',{params: p})

//关联两个商户
export const lineAgent = p => myPost('/mch/agency',p)

//删除子账户
export const delChildAgent = p => myDelete('/mch/agency/'+ p)

// 代付列表
export const payBankList = p => myGet('/bank/payment/sys',{params: p})

//改变代付状态
export const changePayBankState = p => myPost('/bank/payment/sys',p)

// 个码列表
export const qrList = p => myGet('/pay/qr/code',{params: p})

// 增加个码
export const addQr = p => myPost('/pay/qr/code', p)

// 删除个码
export const delQr = p => myDelete('/pay/qr/code/'+ p)

// 设置uid
export const setUid = p => myPost('/pay/qr/uid', p)

//  回调确认列表
export const callbackList = p => myGet('/pay/qr/order',{params: p})

// 回调确认
export const callbackFinish = p => myPost('/pay/qr/order/finish', p)

// 回调回滚
export const callbackRoll = p => myPost('/pay/qr/reissue/rollback', p);

// 上线
export const up = () => myPost('/pay/qr/login')

// 下线
export const down =  () => myDelete('/pay/qr/logout')

// 挂单列表
export const missList = p => myGet('/pay/qr/pending',{params: p})

// 新增挂单
export const addMissList = p => myPost('/pay/qr/pending', p);

// 处理挂单
export const doList = p => myGet('/pay/qr/pending/'+ p)

// 在线人数统计
export const loginNum = () => myGet('/pay/qr/login')

// 充值记录
export const rechargeList = p => myGet('/wallet/recharge/log',{params: p})








