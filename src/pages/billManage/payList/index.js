import React, { Component } from 'react'
import './index.less'
import { payList } from '../../../config/api'
import canverterDate from '../../../utils/canverterDate'


export default class PayList extends Component{

    state = {
        dataList: [],
        loading: true,
        data: {
            mch_ids: '',
            offset: 0,
            limit: 10
        }
    }

    componentWillMount() {
        this.getList()
        this.bindEvents()
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll',this.changeScroll)
    }

    bindEvents() {
        window.addEventListener('scroll',this.changeScroll)
    }

    changeScroll = () => {
        if(window.screen.availHeight + document.documentElement.scrollTop + 100 > document.body.scrollHeight) {
            if(this.state.loading) {
                this.setState({
                    loading: false
                })
                setTimeout( ()=>{
                    let data = this.state.data
                    data.offset = data.offset+data.limit
                    this.setState({
                        data
                    })
                    this.getList()
                    
                },600)
            }
        }
    }

    handleBack = () => {
        this.props.history.push('/home')
    }

    handleMchName = (e) => {
        let data = this.state.data
        data.mch_ids = e.target.value
        this.setState({
            data
        })
    }

    seachMch = () => {
        let data = this.state.data
        data.offset = 0
        this.setState({
            data
        })
        this.getList()
    }


    toMchDetail(item) {
        this.props.history.push({ pathname: '/payDetail',query: { data: item} })
    }

    

    getList = () => {
        let data = this.state.data
        for(var key in data) {
            if(data[key] === '') {
                delete data[key]
            }
        }
        payList(data).then((res) => {
            let dataList = res.data.data_list
            dataList.forEach( ele => {
                if(ele.money && ele.money !== '') {
                    ele.money = ele.money/100
                }
                if(ele.charge_money && ele.charge_money !== '') {
                    ele.charge_money = ele.charge_money/100
                }
                if( ele.create_time ) {
                    ele.create_time = canverterDate(ele.create_time)
                }
                if( ele.trade_time ) {
                    ele.trade_time = canverterDate(ele.trade_time)
                }
                if(ele.status === 1) {
                    ele.status = '新订单'
                }else if(ele.status === 2) {
                    ele.status = '进行中'
                }else if(ele.status === 3) {
                    ele.status = '交易成功'
                }else if(ele.status === 4) {
                    ele.status = '交易失败'
                }else{
                    ele.status = '状态异常'
                }
                if(ele.pay_type && ele.pay_type === 1) {
                    ele.pay_type = '对私'
                } else if(ele.pay_type === 2) {
                    ele.pay_type = '对公'
                }
                if(ele.charge_type && ele.charge_type === 1) {
                    ele.charge_type = '定额'
                } else if(ele.charge_type === 2) {
                    ele.charge_type = '百分比'
                }
                if(ele.bank_payment_id && ele.bank_payment_id === 1) {
                    ele.bank_payment_id = '平安'
                }else if(ele.bank_payment_id === 2) {
                    ele.bank_payment_id = '先锋'
                }
            })
            if(this.state.data.offset === 0) {
                this.setState({
                    dataList
                })
            }else{
                if(dataList.length < 10) {
                    this.setState({
                        dataList: this.state.dataList.concat(dataList),
                        loading: false
                    })
                }else{
                    this.setState({
                        dataList: this.state.dataList.concat(dataList),
                        loading: true
                    })
                }
            }
            
            
        })
    }

    render() {
        return(
            <div className="pay-list">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">代付列表</div>
                </div>
                <div className="search">
                    <input placeholder="请输入商户号" type="text" 
                        value = {this.state.data.mch_ids || ''}
                        onChange = {this.handleMchName}
                    ></input>
                    <div className="search-btn" onClick={this.seachMch}>搜索</div>
                </div>
                { this.state.dataList.map( item =>{
                    return <div className="item" key={item.mch_order_id}>
                    <div className="item-head">
                        <div className="item-title">{item.acc_name}</div>
                        <div className="item-state">{item.status }</div>
                    </div>
                    <div className="content">
                        <div className="detail">交易金额<span>{item.money}</span></div>
                        <div className="detail">手续费<span>{item.charge_money}</span></div>
                        <div className="detail">通道<span>{item.bank_payment_id}</span></div>
                        <div className="detail">代付类型<span>{item.pay_type}</span></div>
                        <div className="detail">创建时间<span>{item.create_time}</span></div>
                    </div>
                    <div className="foot">
                        <div className="foot-btn" onClick={() => this.toMchDetail(item)}>详情</div>
                    </div>
                </div>
                }) }
            </div>
        )
    }

}