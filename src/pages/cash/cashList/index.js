import React, { Component } from 'react'
import './index.less'
import { auditList,auditOk } from '../../../config/api'
import changeDate from '../../../utils/canverterDate'
import { Modal,Toast } from 'antd-mobile'
const alert = Modal.alert;

export default class CashList extends Component {

    state = {
        dataList: [],
        loading: true,
        data: {
            mch_id: '',
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

    handleMchId = (e) => {
        let data = this.state.data
        data.mch_id = e.target.value
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

    handleClickSucc = (id) => {
        let data = {
            cash_log_id: id,
            success: true
        }
        auditOk(data).then(res => {
            Toast.success('到账成功！！！', 1);
            let data = this.state.data
            data.offset = 0
            this.setState({
                data
            })
            this.getList()
        })
    }

    handleClickFail= (id) => {
        let data = {
            cash_log_id: id,
            success: false
        }
        auditOk(data).then(res => {
            Toast.success('已拒绝！！！', 1);
            let data = this.state.data
            data.offset = 0
            this.setState({
                data
            })
            this.getList()
        })
    }

    getList = () => {
        let data = this.state.data
        for(var key in data) {
            if(data[key] === '') {
                delete data[key]
            }
        }
        auditList(data).then((res) => {
            let dataList = res.data.data_list
            dataList.forEach( ele => {
                if(ele.money) {
                    ele.money = ele.money/100
                }
                if(ele.state === 0) {
                    ele.state = '待处理'
                }else if(ele.state === 1) {
                    ele.state = '提现成功'
                }else if(ele.state === 2){
                    ele.state = '提现失败'
                }else if(ele.state === 9){
                    ele.state = '处理中'
                }
                if(ele.type === 1) {
                    ele.type = '手工代付'
                } else if(ele.type === 2) {
                    ele.type = '平安'
                } else if(ele.type === 3) {
                    ele.type = '先锋'
                } else if(ele.type === 4) {
                    ele.type = 'cnt代付'
                }
                if( ele.create_time ) {
                    ele.create_time = changeDate(ele.create_time)
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
        return (
            <div className="cash-list">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={() => {
                        this.props.history.push('/home')
                    }}></img>
                    <div className="title" id="demo">提现列表</div>
                </div>
                <div className="search">
                    <input placeholder="请输入商户号" type="text" 
                        value = {this.state.data.mch_id || ''}
                        onChange = {this.handleMchId}
                    ></input>
                    <div className="search-btn" onClick={this.seachMch}>搜索</div>
                </div>

                { this.state.dataList.map( item =>{
                    return <div className="item" key={item.id}>
                    <div className="item-head">
                        <div className="item-title">{item.mch_name}</div>
                        <div className="item-state">{item.state }</div>
                    </div>
                    <div className="content">
                        <div className="detail">银行卡类型<span>{item.open_bank}</span></div>
                        <div className="detail">银行卡号<span>{item.bankcard_number}</span></div>
                        <div className="detail">金额<span>{item.money}</span></div>
                        <div className="detail">代付类型<span>{item.type}</span></div>
                    </div>
                    <div className="foot">
                        {/* <div className="foot-btn" onClick={() => this.toMchDetail(item.mch_id)}>详情</div> */}
                        {/* <div className="foot-btn">{item.state===0?'到账':''}</div> */}
                        {item.state==='待处理'?<div className="foot-btn" 
                            onClick={() =>
                                alert('提示', '若商户提现至先锋备付金，到账成功，将自动增加至商户代付余额，请勿重复入账！', [
                                    { text: 'Cancel', onPress: () => console.log('cancel') },
                                    { text: 'Ok', onPress: () => this.handleClickSucc(item.id) },
                                    ])
                                }>
                            到账</div>:''
                        }
                        {item.state==='待处理'?<div className="foot-btn" 
                            onClick={() =>
                                alert('提示', '是否确认拒绝到账?', [
                                    { text: 'Cancel', onPress: () => console.log('cancel') },
                                    { text: 'Ok', onPress: () => this.handleClickFail(item.id) },
                                    ])
                                }>
                            拒绝</div>:''
                        }
                    </div>
                </div>
                }) }
            </div>

        )
    }
}
