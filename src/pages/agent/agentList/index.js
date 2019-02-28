import React, { Component } from 'react'
import './index.less'
import { agentList,delChildAgent,lineAgent } from '../../../config/api'
import { Modal,Toast } from 'antd-mobile'



export default class AgentList extends Component {

    state= {
        dataList: [],
        loading: true,
        data: {
            type: 1,
            mch_id: '',
            sub_id: '',
            offset: 0,
            limit: 10
        }
    }

    handleMchName = (e) => {
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

    add = () => {
        const prompt = Modal.prompt;
        prompt(
            '添加子账户',
            null,
            (mch_id, sub_id) => {
                let data = {
                    type: "1",
                    mch_id: mch_id,
                    sub_id: sub_id
                }
                lineAgent(data).then( res => {
                    Toast.success('删除成功！！！', 1);
                    this.seachMch()
                })
            },
            'login-password',
            null,
            ['请输入代理商商户号', '请输入子商户号'],
          )
    }

    handleDel = (id) => {
        const alert = Modal.alert;
        alert('提示', '确认删除?', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { 
                text: 'Ok', onPress: () => {
                    delChildAgent(id).then( res => {
                        Toast.success('删除成功！！！', 1);
                        this.seachMch()
                    })
                }
            },
        ])
    }

    getList = () => {
        let data = this.state.data
        for(var key in data) {
            if(data[key] === '') {
                delete data[key]
            }
        }
        agentList(data).then((res) => {
            let dataList = res.data.data_list
            dataList.forEach( ele => {
                ele.sup_wx_rate = ele.sup_wx_rate/100 + '%'
                ele.sub_wx_rate = ele.sub_wx_rate/100 + '%'
                ele.wx_rate = ele.wx_rate/100 + '%'
                ele.sup_alipay_rate = ele.sup_alipay_rate/100 + '%'
                ele.sub_alipay_rate = ele.sub_alipay_rate/100 + '%'
                ele.alipay_rate = ele.alipay_rate/100 + '%'
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
            <div className="agent-list">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={() => this.props.history.push('/home')}></img>
                    <div className="title" id="demo">支付代理</div>
                </div>
                <div className="search">
                    <input placeholder="代理商商户号" type="text" 
                        value = {this.state.data.mch_id || ''}
                        onChange = {this.handleMchName}
                    ></input>
                    <div className="search-btn" onClick={this.seachMch}>搜索</div>
                    {/* <img src={require('../../../resource/img/ic_add.png')} alt="" onClick={this.add}></img> */}
                    
                </div>
                { this.state.dataList.map( item =>{
                    return <div className="item" key={item.id}>
                    <div className="item-head">
                        <div className="item-title">{item.mch_name}</div>
                        {/* <div className="item-state">{item.state }</div> */}
                    </div>
                    <div className="content">
                        <div className="detail">代理商商户号<span>{item.mch_id}</span></div>
                        <div className="detail">子商户号<span>{item.sub_id}</span></div>
                        <div className="detail">子商户名称<span>{item.sub_name}</span></div>
                        <div className="detail">微信费率差<span>{item.wx_rate}</span></div>
                        <div className="detail">支付宝费率差<span>{item.alipay_rate}</span></div>
                    </div>
                    <div className="foot">
                        <div className="foot-btn" onClick={() => this.handleDel(item.id)}>删除</div>
                    </div>
                </div>
                }) }
            </div>
        )
    }
}
