import React, { Component } from 'react'
import './index.less'
import { billList,reissue,rollback } from '../../../config/api'
import canverterDate from '../../../utils/canverterDate'
import { Modal,Toast } from 'antd-mobile';

const alert = Modal.alert;

export default class BillList extends Component{

    state = {
        dataList: [],
        loading: true,
        data: {
            mch_name: '',
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
        data.mch_name = e.target.value
        this.setState({
            data
        })
    }

    seachMch = () => {
        this.setState({
            dataList: []
        })
        this.getList()
    }


    toMchDetail(item) {
        this.props.history.push({ pathname: '/billDetail',query: { data: item} })
    }

    // 补单
    handleClickReissue(row) {
        alert('补单', '确定补单吗???', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => {
                let data = {
                    sys_order_id: row.sys_order_id
                }
                reissue(data).then( res => {
                    Toast.success('补单成功!!!', 1)
                    let data = this.state.data
                    data.offset = 0
                    this.setState({
                        data
                    })
                    this.getList()
                })
            } },
          ])
    }
    //回滚
    handleClickRollback(row) {
        alert('回滚', '确定回滚吗???', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => {
                let data = {
                    sys_order_id: row.sys_order_id
                }
                rollback(data).then( res => {
                    Toast.success('回滚成功!!!', 1)
                    let data = this.state.data
                    data.offset = 0
                    this.setState({
                        data
                    })
                    this.getList()
                })
            } },
        ])
    }
    

    getList = () => {
        let data = this.state.data
        for(var key in data) {
            if(data[key] === '') {
                delete data[key]
            }
        }
        billList(data).then((res) => {
            let dataList = res.data.data_list
            dataList.forEach( ele => {
                if(ele.money && ele.money !== '') {
                    ele.money = ele.money/100
                }
                if(ele.mch_charge && ele.mch_charge !== '') {
                    ele.mch_charge = ele.mch_charge/100
                }
                if( ele.create_time ) {
                    ele.create_time = canverterDate(ele.create_time)
                }
                if(ele.state === 1) {
                    ele.state = '待支付'
                }else if(ele.state === 2) {
                    ele.state = '交易进行中'
                }else if(ele.state === 3) {
                    ele.state = '交易成功'
                }else if(ele.state === 4) {
                    ele.state = '交易失败'
                }else if(ele.state === 9) {
                    ele.state = '超时关闭'
                }else{
                    ele.state = '状态异常'
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
            <div className="bill-list">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">交易列表</div>
                </div>
                <div className="search">
                    <input placeholder="商户名称" type="text" 
                        value = {this.state.data.mch_name || ''}
                        onChange = {this.handleMchName}
                    ></input>
                    <div className="search-btn" onClick={this.seachMch}>搜索</div>
                </div>
                { this.state.dataList.map( item =>{
                    return <div className="item" key={item.mch_order_id}>
                    <div className="item-head">
                        <div className="item-title">{item.mch_name}</div>
                        <div className="item-state">{item.state }</div>
                    </div>
                    <div className="content">
                        <div className="detail">手机号<span>{item.phone}</span></div>
                        <div className="detail">交易金额<span>{item.money}</span></div>
                        <div className="detail">手续费<span>{item.mch_charge}</span></div>
                        <div className="detail">通道<span>{item.channel_name}</span></div>
                        <div className="detail">创建时间<span>{item.create_time}</span></div>
                    </div>
                    <div className="foot">
                        <div className="foot-btn" onClick={() => this.toMchDetail(item)}>详情</div>
                        {item.state === '待支付' || item.state === '超时关闭' ? <div className="foot-btn" onClick={() => this.handleClickReissue(item)}>补单</div> : null}
                        {item.super_order_id && item.super_order_id.indexOf('unknown') === 0 ? <div className="foot-btn rollback" onClick={() => this.handleClickRollback(item)}>回滚</div> : null}
                    </div>
                </div>
                }) }
            </div>
        )
    }

}