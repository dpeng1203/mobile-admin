import React, { Component } from 'react'
import './index.less'

export default class BillList extends Component{

    state={
        list: this.props.location.query.data,
    }


    handleBack = () => {
        this.props.history.push('/billList')
    }

    render() {
        return(
            <div className="bill-detail">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">商户详情</div>
                </div>
                <div className="wrap">
                    <div className="name">商户号：<span>{this.state.list.mch_id}</span></div>
                    <div className="name">商户名称：<span>{this.state.list.mch_name}</span></div>
                    <div className="name">商户订单：<span>{this.state.list.mch_order_id}</span></div>
                    <div className="name">系统订单：<span>{this.state.list.sys_order_id}</span></div>
                    <div className="name">支付类型：<span>{this.state.list.pay_type}</span></div>
                    <div className="name">通道：<span>{this.state.list.channel}</span></div>
                    <div className="name">金额：<span>{this.state.list.money}</span></div>
                    <div className="name">手续费：<span>{this.state.list.mch_charge}</span></div>
                    <div className="name">创建时间：<span>{this.state.list.create_time}</span></div>
                    <div className="name">交易时间：<span>{this.state.list.trade_time}</span></div>
                    <div className="name">状态：<span>{this.state.list.state}</span></div>
                </div>
            </div>
        )
    }
}