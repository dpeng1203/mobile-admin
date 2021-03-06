import React, { Component } from 'react'
import './index.less'
import { merList } from '../../../config/api'
import { Pagination } from 'antd-mobile';

export default class MchList extends Component{

    state = {
        dataList: [],
        loading: true,
        data: {
            mch_id: '',
            offset: 0,
            limit: 10
        },
        total: null,
    }
    
    componentWillMount() {
        this.getMerList()
        // this.bindEvents()
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
                    this.getMerList()
                    
                },600)
            }
        }
    }

    handleBack = () => {
        this.props.history.push('/home')
    }

    handleMchName = (e) => {
        let data = this.state.data
        data.mch_id = e.target.value
        this.setState({
            data,
        })
    }

    seachMch = () => {
        let data = this.state.data
        data.offset = 0
        this.setState({
            data
        })
        this.getMerList()
    }


    toMchDetail(id) {
        this.props.history.push({ pathname : '/mchDetail',query: { mch_id: id} })
    }

    toChangeChannel(item) {
        this.props.history.push({ pathname : '/changeChannel',query: { item: item} })
    }
    //回到第一页
    handleFirst = () => {
        let data = this.state.data
        data.offset = 0
        this.setState({
            data
        })
        this.getMerList()
    }

    changeCurrent = (value) => {
        let data = this.state.data
        data.offset = (value-1)*10
        this.setState({
            data
        })
        this.getMerList()
    }

    //回到尾页
    handleEnd = () => {
        let data = this.state.data
        data.offset = (this.state.total-1)*10
        this.setState({
            data
        })
        this.getMerList()
    }

    getMerList = () => {
        let data = this.state.data
        for(var key in data) {
            if(data[key] === '') {
                delete data[key]
            }
        }
        merList(data).then((res) => {
            let dataList = res.data.data_list
            let total = Math.ceil(res.data.total_count/10) 
            dataList.forEach( ele => {
                if(ele.money) {
                    ele.money = ele.money/100
                }
                if(ele.audit_state === 0) {
                    ele.audit_state = '待审核'
                }else if(ele.audit_state === 1) {
                    ele.audit_state = '审核成功'
                }else {
                    ele.audit_state = '审核失败'
                }
            })
            this.setState({
                dataList,
                total
            })
            // if(this.state.data.offset === 0) {
            //     this.setState({
            //         dataList,
            //         total
            //     })
            // }else{
            //     if(dataList.length < 10) {
            //         this.setState({
            //             dataList: this.state.dataList.concat(dataList),
            //             loading: false,
            //             total
            //         })
            //     }else{
            //         this.setState({
            //             dataList: this.state.dataList.concat(dataList),
            //             loading: true,
            //             total
            //         })
            //     }
            // }
            
        })
    }


    render() {
        return(
            <div className="mch-list">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">商户列表</div>
                </div>
                <div className="search">
                    <input placeholder="商户名称" type="text" 
                        value = {this.state.data.mch_id || ''}
                        onChange = {this.handleMchName}
                    ></input>
                    <div className="search-btn" onClick={this.seachMch}>搜索</div>
                </div>
                { this.state.dataList.map( item =>{
                    return <div className="item" key={item.mch_id}>
                    <div className="item-head">
                        <div className="item-title">{item.mch_name}</div>
                        <div className="item-state">{item.audit_state }</div>
                    </div>
                    <div className="content">
                        <div className="detail">手机号<span>{item.phone}</span></div>
                        <div className="detail">账户余额<span>{item.money}</span></div>
                        <div className="detail">账户状态<span>{item.mch_state==="enable"?'激活':'冻结'}</span></div>
                        <div className="detail">通道<span>{item.channel_name}</span></div>
                    </div>
                    <div className="foot">
                        <div className="foot-btn" onClick={() => this.toMchDetail(item.mch_id)}>详情</div>
                        <div className="foot-btn" onClick={() => this.toChangeChannel(item)}>切换通道</div>
                        {/* <div className="foot-btn">{item.mch_state==="enable"?'冻结':'激活'}</div> */}
                    </div>
                </div>
                }) }
                <div className="pagination-wrapper">
                    <div className="first" onClick={this.handleFirst}>首页</div>
                    <div className="wrapper">
                        <Pagination 
                            total={this.state.total} 
                            current={this.state.data.offset/10 + 1} 
                            locale={{prevText: '<',nextText: '>',}}
                            onChange={this.changeCurrent} 
                        />
                    </div>
                    <div className="first" onClick={this.handleEnd}>尾页</div>
                </div>
                
            </div>
        )
    }
}