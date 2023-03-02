const axios = require('axios');

module.exports ={
     fetchDetailData:(params)=>{
        return axios.get('/api/expert-page/base-info',params).then(res=>{
            return res
        }).catch(err=>{
            console.log(err);
        })
    }
}



