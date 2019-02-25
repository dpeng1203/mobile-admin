import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import MchList from './pages/mchManage/mchList'
import MchDetail from './pages/mchManage/mchDetail'
import ChangeChannel from './pages/mchManage/changeChannel'
import BillList from './pages/billManage/billList'
import PayList from './pages/billManage/payList'
import BillDetail from './pages/billManage/billDetail'
import PayDetail from './pages/billManage/payDetail'
import SysList from './pages/sysManage/sysList'
import ChangeSys from './pages/sysManage/changeSys'
import CashList from './pages/cash/cashList'
import AgentList from './pages/agent/agentList'
import AgentPayList from './pages/agent/agentPayList'
import EnterChannel from './pages/channel/enterChannel'
import OutChannel from './pages/channel/outChannel'



export default class ERouter extends React.Component{

    render() {
        return(
            <HashRouter>
                <App>
                    <Route exact path="/" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/mchList" component={MchList}/>
                    <Route path="/mchDetail" component={MchDetail}/>
                    <Route path="/changeChannel" component={ChangeChannel}/>
                    <Route path="/billList" component={BillList}/>
                    <Route path="/payList" component={PayList}/>
                    <Route path="/billDetail" component={BillDetail}/>
                    <Route path="/payDetail" component={PayDetail}/>
                    <Route path="/sysList" component={SysList}/>
                    <Route path="/changeSys" component={ChangeSys}/>
                    <Route path="/cashList" component={CashList}/>
                    <Route path="/agentList" component={AgentList}/>
                    <Route path="/agentPayList" component={AgentPayList}/>
                    <Route path="/enterChannel" component={EnterChannel}/>
                    <Route path="/outChannel" component={OutChannel}/>
                </App>
            </HashRouter>  
        )
    }
}