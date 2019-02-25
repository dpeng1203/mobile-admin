// 配置开发环境与生产环境
let hostName

if (process.env.NODE_ENV === 'development') {
    hostName = 'http://116.62.209.131:8080'     //测试
}else{
    // hostName = 'http://116.62.209.131:8080'      //测试
    // hostName = 'http://47.99.180.135:8080'   //正式
    hostName = window.location.origin + ':8080'
}

export default hostName