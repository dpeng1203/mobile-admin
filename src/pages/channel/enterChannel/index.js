import React, { Component } from 'react'
import './index.less'
import changeDate from '../../../utils/canverterDate'
import { channelList,changeChannelState } from '../../../config/api'
import { Modal,Toast } from 'antd-mobile'


export default class SysList extends Component {

  state = {
    tableData: []
  } 

  componentDidMount() {
    this.getList()
  }

  changeSys = (item) => {
    const alert = Modal.alert;
    alert('提示', '确认切换状态?', [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        { 
            text: 'Ok', onPress: () => {
                let data = {
                    id: item.id,
                    is_open: item.state === true ? false : true
                }
                changeChannelState(data).then( res => {
                    Toast.success('切换成功！！！', 1);
                    this.getList()
                })
            }
        },
    ])
  } 

  getList() {
    const data = {
      offset: 0,
      limit: 20
    }
    channelList(data).then((res) => {
      let tableData = res.data.data_list
      tableData.forEach( ele => {
        if(ele.state) {
            ele.status = '开启'
        }else {
            ele.status = '关闭'
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
      <div className="enter-channel">
        <div className="top">
          <img src={require('../../../resource/img/ic_back.png')} alt="" onClick={() => {
              this.props.history.push('/home')
          }}></img>
          <div className="title" id="demo">充值通道</div>
        </div>
        { this.state.tableData.map( item =>{
          return <div className="item" key={item.id}>
            <div className="item-head">
              <div className="item-title">{item.name}</div>
              <div className="item-state">{item.status }</div>
            </div>
            <div className="content">
              <div className="detail">通道标识<span>{item.code}</span></div>
              <div className="detail">创建时间<span>{item.create_time}</span></div>
            </div>
            <div className="foot">
              <div className="foot-btn" onClick={() => this.changeSys(item)}>{item.status === "开启"?'关闭':'开启'}</div>
            </div>
          </div>
        }) }
      </div> 
    )
  }
}
