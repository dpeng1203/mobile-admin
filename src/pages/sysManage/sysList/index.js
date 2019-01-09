import React, { Component } from 'react'
import './index.less'
import changeDate from '../../../utils/canverterDate'
import { sysApp } from '../../../config/api'

export default class SysList extends Component {

  state = {
    tableData: []
  } 

  componentDidMount() {
    this.getList()
  }

  changeSys = (item) => {
    this.props.history.push({ pathname: '/changeSys',query: { data: item} })
  } 

  getList() {
    const data = {
      offset: 0,
      limit: 10
    }
    sysApp(data).then((res) => {
      let tableData = res.data.data_list
      tableData.forEach( ele => {
        if(ele.status && ele.status === true) {
          ele.status = '开启'
        }else {
          ele.status = '关闭'
        }
        if(ele.rate) {
          ele.rate = ele.rate/100
        }
        if( ele.create_time ) {
          ele.create_time = changeDate(ele.create_time)
        }
      })
      this.setState({
        tableData
      })
    })
  }

  render() {
    return(
      <div className="sys-list">
        <div className="top">
          <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={() => {
              this.props.history.push('/home')
          }}></img>
          <div className="title" id="demo">产品列表</div>
        </div>
        { this.state.tableData.map( item =>{
          return <div className="item" key={item.id}>
            <div className="item-head">
              <div className="item-title">{item.app_name}</div>
              <div className="item-state">{item.status }</div>
            </div>
            <div className="content">
              <div className="detail">费率<span>{item.rate}</span></div>
              <div className="detail">创建时间<span>{item.create_time}</span></div>
            </div>
            <div className="foot">
              <div className="foot-btn" onClick={() => this.changeSys(item)}>修改</div>
            </div>
          </div>
        }) }
      </div> 
    )
  }
}
