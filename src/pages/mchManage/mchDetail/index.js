import React, { Component } from 'react'
import './index.less'
import {Button} from 'antd-mobile'
import { merInfoList,auditPass } from '../../../config/api'
import {Toast} from 'antd-mobile'

export default class MchDetail extends Component{

    state={
        mch_id: this.props.location.query.mch_id,
        list: {},
    }
    componentWillMount(){
        this.getMerInfo()
    }

    getMerInfo() {
        let data = {
            mch_id: this.state.mch_id
        }
        merInfoList(data).then( res => {
            if(res.data.data_list.length !== 0) {
                this.setState({
                    list: res.data.data_list[0],
                    license_images: res.data.data_list[0].license_images,
                    card_images: res.data.data_list[0].card_images,
                })
            }
            
        })
    }

    handleBack = () => {
        this.props.history.push('/mchList')
    }


    pass = () => {
        let data = {
            mch_id: this.state.mch_id,
            state: 1
        }
        auditPass(data).then( res => {
            Toast.success('审核通过！')
            this.props.history.push('/mchList')
        })
    }

    fail = () => {
        let data = {
            mch_id: this.state.mch_id,
            state: 2
        }
        auditPass(data).then( res => {
            Toast.offline('审核失败！')
            this.props.history.push('/mchList')
        })
    }

    

    render() {
        return(
            <div className="mch-detail">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={this.handleBack}></img>
                    <div className="title" id="demo">商户详情</div>
                </div>
                <div className="wrap">
                    <div className="name">商户简称：<span>{this.state.list.nick_name}</span></div>
                    <div className="name">法人姓名：<span>{this.state.list.legal_name}</span></div>
                    <div className="name">法人手机号：<span>{this.state.list.legal_phone}</span></div>
                    <div className="name">邮箱地址：<span>{this.state.list.email}</span></div>
                    <div className="name">其他联系人姓名：<span>{this.state.list.link_name}</span></div>
                    <div className="name">其他联系人手机号：<span>{this.state.list.link_phone}</span></div>
                    <div className="name">统一社会信用代码：<span>{this.state.list.org_code}</span></div>
                </div>
                <div className="wrap">
                    <div className="title">商户资质</div>
                    <p className="photo-title">营业执照</p>
                    <div className="img-wrap">
                        {/* <img src='' alt=""></img> */}
                    </div>
                    <p className="photo-title">身份证</p>
                    <div className="img-wrap">
                        {/* {this.state.license_images.map( item => {
                            return <img src='http://47.99.180.135:8080/9'  alt=""></img>
                        })} */}
                    </div>
                </div>
                {this.state.list.state === 0? <div className="btn-wrap">
                    <Button type="primary" inline className="succ" onClick={this.pass}>审核通过</Button>
                    <Button type="ghost" inline  className="fail" onClick={this.fail}>审核拒绝</Button>
                </div> : null }
            </div>
        )
    }
    
}