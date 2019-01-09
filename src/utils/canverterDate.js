const canverterDate = (data) => {
        var dateee = new Date(data).toJSON();
        var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
        return date
    }
    
export default canverterDate