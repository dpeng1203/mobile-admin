import React, { Component } from 'react';
import './index.less'
import { login } from '../../config/api'

export default class Login extends Component{
    state={
        accountValue: '',
        pwValue: ''
    }

    handleGetaccountValue = (event) => {
        this.setState({
          accountValue : event.target.value,
        })
    }

    handleGetPwValue = (event) => {
        this.setState({
          pwValue : event.target.value,
        })
    }

    login = () => {
        localStorage.clear()
        let data = {
            phone: this.state.accountValue,
            password: this.state.pwValue
        }
        login(data).then((res) => {
            localStorage.id = res.id
            localStorage.nickname = res.nickname
            if(res.base.mch_name) {
                localStorage.name = res.base.mch_name
            }
            this.props.history.push("/home")
        })
    }

    render() {
        return(
            <div className="login">
                <div className="title">AlianPAY后台</div>
                <div className="content">
                    <div className="item">
                        <p>账号</p>
                        <input 
                        type="text" 
                        placeholder="请输入账号" 
                        value={this.state.accountValue}
                        onChange={this.handleGetaccountValue}
                        ></input>
                    </div>
                    <div className="item">
                        <p>密码</p>
                        <input type="password" placeholder="请输入密码"
                        value={this.state.pwValue}
                        onChange={this.handleGetPwValue}
                        ></input>
                    </div>
                </div>
                <div className="login-btn" onClick={this.login}>登录</div>
            </div>
        ) 
    }
}