import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import MchList from './pages/mchManage/mchList'
import MchDetail from './pages/mchManage/mchDetail'
import BillList from './pages/billManage/billList'
import BillDetail from './pages/billManage/billDetail'
import SysList from './pages/sysManage/sysList'
import ChangeSys from './pages/sysManage/changeSys'
import CashList from './pages/cash/cashList'


export default class ERouter extends React.Component{

    render() {
        return(
            <HashRouter>
                <App>
                    <Route exact path="/" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/mchList" component={MchList}/>
                    <Route path="/mchDetail" component={MchDetail}/>
                    <Route path="/billList" component={BillList}/>
                    <Route path="/billDetail" component={BillDetail}/>
                    <Route path="/sysList" component={SysList}/>
                    <Route path="/changeSys" component={ChangeSys}/>
                    <Route path="/cashList" component={CashList}/>
                </App>
            </HashRouter>  
        )
    }
}