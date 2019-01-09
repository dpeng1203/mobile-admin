import React, { Component } from 'react';
import './index.less'
import { loginOut } from '../../config/api'
import { Link } from 'react-router-dom'
import { Toast } from 'antd-mobile'

export default class Home extends Component{

    state={
        name: localStorage.name
    }

    handleOut = () => {
        loginOut().then((res) => {
            Toast.success('退出成功!!!')
            localStorage.clear()
            this.props.history.push("/login")
        }, (err) => {
            this.props.history.push("/login")
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
                            <img src={require("../../resource/img/ic_potential_business.png")} alt="" />
                            <p>商户管理</p>
                        </Link>
                        <Link to='/billList' className="item">
                            <img src={require("./../../resource/img/ic_new_business.png")} alt="" />
                            <p>交易管理</p>
                        </Link>
                        <Link to='/sysList' className="item">
                            <img src={require("./../../resource/img/ic_business_list.png")} alt="" />
                            <p>产品管理</p>
                        </Link>
                        <div className="item">
                            <img src={require("./../../resource/img/ic_data.png")} alt="" />                            
                            <p>数据</p>
                        </div>
                        <Link to='/cashList' className="item">
                            <img src={require("./../../resource/img/ic_change_password.png")} alt="" />                            
                            <p>提现管理</p>
                        </Link>
                        <div className="item">
                            <img src={require("./../../resource/img/ic_home_xiaoxi.png")} alt="" /> 
                            <p>代理管理</p>
                        </div>
                        <div className="item">
                            <img src={require("./../../resource/img/ic_home_shuquanhexiao.png")} alt="" /> 
                            <p>通道管理</p>
                        </div>
                        <div className="item">
                            <img src={require("./../../resource/img/ic_home_shoukuan.png")} alt="" />    
                            <p>代付管理</p>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}