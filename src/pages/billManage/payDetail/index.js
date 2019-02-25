import React, { Component } from 'react'
import './index.less'

export default class BillList extends Component{

    state={
        list: this.props.location.query.data,
    }


    handleBack = () => {
        this.props.history.push('/payList')
    }

    render() {
        let list = this.state.list
        return(
            <div className="bill-detail">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">代付详情</div>
                </div>
                <div className="wrap">
                    <div className="name">商户号：<span>{list.mch_id}</span></div>
                    <div className="name">商户名称：<span>{list.acc_name}</span></div>
                    <div className="name">手机号：<span>{list.mobile}</span></div>
                    <div className="name">银行名称：<span>{list.bank_name}</span></div>
                    <div className="name">收款人卡号：<span>{list.acc_no}</span></div>
                    <div className="name">商户订单号：<span>{list.mch_order_id}</span></div>
                    <div className="name">系统订单号：<span>{list.sys_order_id}</span></div>
                    <div className="name">上游订单号：<span>{list.super_order_id}</span></div>
                    <div className="name">代付类型：<span>{list.pay_type}</span></div>
                    <div className="name">结算类型：<span>{list.charge_type}</span></div>
                    <div className="name">通道：<span>{list.bank_payment_id}</span></div>
                    <div className="name">金额：<span>{list.money}</span></div>
                    <div className="name">手续费：<span>{list.charge_money}</span></div>
                    <div className="name">创建时间：<span>{list.create_time}</span></div>
                    <div className="name">交易时间：<span>{list.trade_time}</span></div>
                    <div className="name">状态：<span>{list.status}</span></div>
                    {/* <div className="name">备注：<span>{list.msg}</span></div> */}
                </div>
            </div>
        )
    }
}