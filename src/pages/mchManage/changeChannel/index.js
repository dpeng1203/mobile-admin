import React, { Component } from 'react'
import './index.less'
import { channelList,changeMchChannel } from '../../../config/api'

export default class ChanngeChannel extends Component {

    state = {
        mch_id: this.props.location.query.item.mch_id,
        channelList: [],
        count: this.props.location.query.item.channel_id
    }

    componentDidMount() {
        this.getChannelList()
    }

    handleBack = () => {
        this.props.history.push('/mchList')
    }

    // 通道列表
    getChannelList = () => {
        let data = {
            offset: 0,
            limit: 10000
        }
        channelList(data).then((res) => {
            let channelList = res.data.data_list
            channelList = channelList.filter( ele => {
                return ele.state 
            })
            this.setState({
                channelList
            })
        })
    }
    //确认通道
    channel = () =>{
        let data = {
            mch_id: this.state.mch_id,
            channel_id: this.state.count
        }
        changeMchChannel(data).then( res => {
            this.props.history.push('/mchList')
        })
    } 

    render() {
        return (
            <div className="change-channel">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">切换通道</div>
                    <div className="sure" onClick={this.channel}>确定</div>
                </div>
                {
                    this.state.channelList.map(item => {
                        return <div className="item" key={item.id} onClick={() => this.setState({count:item.id})}>
                            <div className="name">{item.name}</div>
                            {
                                item.id === this.state.count?
                                <img src={require('../../../resource/img/ic_select.png')} alt=""></img>:
                                <img src={require('../../../resource/img/ic_select_grey.png')} alt=""></img>
                            }
                        </div>
                    })
                }
            </div>
        )
    }
}





