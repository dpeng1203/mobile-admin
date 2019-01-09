import React, { Component } from 'react'
import './index.less'

export default class CashList extends Component {
    render() {
        return (
            <div className="cash-list">
                <div className="top">
                    <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={() => {
                        this.props.history.push('/home')
                    }}></img>
                    <div className="title" id="demo">提现列表</div>
                </div>
            </div>
        )
    }
}
