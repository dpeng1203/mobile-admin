import React, { Component } from 'react'
import './index.less'
import { List,Switch,Toast } from 'antd-mobile'
import { changeSysApp } from '../../../config/api'

export default class ChangeSys extends Component {

    state={
        name: this.props.location.query.data.app_name,
        rate: this.props.location.query.data.rate,
        status: this.props.location.query.data.status==='开启'?true:false
    }

    handleChange = () => {
        changeSysApp(this.state).then( res => {
            Toast('修改成功！！',1)
            this.props.history.push('/sysList')
       })
    }

    changeValue = (event) => {
        if(event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        }
        if(event.target.name === "rate") {
            this.setState({
                rate: event.target.value
            })
        }
    }

    render() {
        return (
        <div className="change-sys">
            <div className="top">
                <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={() => {
                    this.props.history.push('/sysList')
                }}></img>
                <div className="title" id="demo">修改应用</div>
            </div>
            <div className="content">
                <div className="wrapper">
                    <div className="name">应用名称：</div>
                    <input type="text" value={this.state.name} name="name" onChange={this.changeValue}/>
                </div>
                <div className="wrapper">
                    <div className="name">费率：</div>
                    <input type="text" value={this.state.rate} name="rate" onChange={this.changeValue}/>
                </div>
                
                <List.Item
                    extra={<Switch
                        checked={this.state.status}
                        onChange={() => {
                            this.setState({
                                status: !this.state.status,
                            });
                        }}
                    />}
                >状态：</List.Item>
            </div>
            
            <div className="btn" onClick={this.handleChange}>确定</div>
        </div>
        )
    }
}
