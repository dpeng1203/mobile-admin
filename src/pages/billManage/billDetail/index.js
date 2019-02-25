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
        let list = this.state.list
        return(
            <div className="bill-detail">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">充值详情</div>
                </div>
                <div className="wrap">
                    <div className="name">商户号：<span>{list.mch_id}</span></div>
                    <div className="name">商户名称：<span>{list.mch_name}</span></div>
                    <div className="name">商户订单：<span>{list.mch_order_id}</span></div>
                    <div className="name">系统订单：<span>{list.sys_order_id}</span></div>
                    <div className="name">支付类型：<span>{list.pay_type}</span></div>
                    <div className="name">通道：<span>{list.channel}</span></div>
                    <div className="name">金额：<span>{list.money}</span></div>
                    <div className="name">手续费：<span>{list.mch_charge}</span></div>
                    <div className="name">创建时间：<span>{list.create_time}</span></div>
                    <div className="name">交易时间：<span>{list.trade_time}</span></div>
                    <div className="name">状态：<span>{list.state}</span></div>
                    {/* <div className="name">是否手动补单：<span>{list.handle}</span></div> */}
                </div>
            </div>
        )
    }
}