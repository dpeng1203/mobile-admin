import React, { Component } from 'react';
import './index.less'
import { loginOut } from '../../config/api'
import { Link } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import ic_potential_business from '../../resource/img/ic_potential_business.png'
import ic_new_business from './../../resource/img/ic_new_business.png'
import ic_data from './../../resource/img/ic_data.png' 
import ic_business_list from './../../resource/img/ic_business_list.png' 
import ic_change_password from './../../resource/img/ic_change_password.png' 
import ic_home_xiaoxi from './../../resource/img/ic_home_xiaoxi.png' 
import ic_business_clue from './../../resource/img/ic_business_clue.png' 
import ic_home_shuquanhexiao from './../../resource/img/ic_home_shuquanhexiao.png' 
import ic_home_shoukuan from './../../resource/img/ic_home_shoukuan.png' 

export default class Home extends Component{

    state={
        name: localStorage.name
    }

    handleOut = () => {
        loginOut().then((res) => {
            Toast.success('退出成功!!!',1)
            localStorage.clear()
            this.props.history.push("/")
        }, (err) => {
            this.props.history.push("/")
        })
    }


    render() {
        return(
            <div className="home">
                <div className="top">
                    <div className="name">AlianPAY</div>
                    <div className="out" onClick={this.handleOut}>退出</div>
                </div>
                <div className="box">
                    <div className="box-name">您好，{this.state.name}</div>
                </div>
                <div className="content">
                    <div className="item-wrapper">
                        <Link to="/mchList" className="item">
                            <img src={ic_potential_business} alt="" />
                            <p>商户管理</p>
                        </Link>
                        <Link to='/billList' className="item">
                            <img src={ic_new_business} alt="" />
                            <p>充值交易</p>
                        </Link>
                        <Link to='/payList' className="item">
                            <img src={ic_data} alt="" />
                            <p>代付交易</p>
                        </Link>
                        <Link to='/sysList' className="item">
                            <img src={ic_business_list} alt="" />
                            <p>产品管理</p>
                        </Link>
                        {/* <div className="item">
                            <img src={require("./../../resource/img/ic_data.png")} alt="" />                            
                            <p>数据</p>
                        </div> */}
                        <Link to='/cashList' className="item">
                            <img src={ic_change_password} alt="" />                            
                            <p>提现管理</p>
                        </Link>
                        <Link to='/agentList' className="item">
                            <img src={ic_home_xiaoxi} alt="" /> 
                            <p>支付代理</p>
                        </Link>
                        <Link to='/agentPayList' className="item">
                            <img src={ic_business_clue} alt="" /> 
                            <p>代付代理</p>
                        </Link>
                        <Link to='/enterChannel' className="item">
                            <img src={ic_home_shuquanhexiao} alt="" /> 
                            <p>充值通道</p>
                        </Link>
                        <Link to='/outChannel' className="item">
                            <img src={ic_home_shoukuan} alt="" /> 
                            <p>代付通道</p>
                        </Link>
                        {/* <div className="item">
                            <img src={require("./../../resource/img/ic_home_shoukuan.png")} alt="" />    
                            <p>代付管理</p>
                        </div> */}
                    </div>
                </div>
            </div>
        ) 
    }
}