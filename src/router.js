import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import MchList from './pages/mchManage/mchList'

export default class ERouter extends React.Component{

    render() {
        return(
            <HashRouter>
                <App>
                    <Route exact path="/" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/mchList" component={MchList}/>
                </App>
            </HashRouter>  
        )
    }
}