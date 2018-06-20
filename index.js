var axios = require('axios');
const URL = 'https://api.coingecko.com/api/v3/coins/list';
axios.get(URL).then(res =>{
    let obj = {};
    let list = res.data.splice(0,99);
    list.forEach(item => {
      obj[item.symbol] = item.id
    });
    console.log(JSON.stringify(obj));
  })