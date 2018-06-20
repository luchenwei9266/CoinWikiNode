const { youdao, baidu, google } = require('translation.js')

var AV = require('leanengine');
var axios = require('axios');
const URL = 'https://api.coingecko.com/api/v3/coins/list';
var CoinURL = 'https://api.coingecko.com/api/v3/coins/';

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request) {
    return 'Hello world!';
});

AV.Cloud.define("updateCoinInfo", function(request) {
    axios.get(URL).then(res => {
        let obj = {};
        let list = res.data;
        list.forEach(item => {
            obj[item.symbol] = item.id
        });
        let CoinInfoItem = AV.Object.extend("Coins");
        let coinInfo = new CoinInfoItem();
        coinInfo.set("list", JSON.stringify(obj));
        coinInfo.save().then(res => {
            console.log("update coininfo OK!")
        }, (err) => {
            console.log(err);
        });
    })
});