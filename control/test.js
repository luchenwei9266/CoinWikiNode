const { youdao, baidu, google } = require('translation.js')

var AV = require('leanengine');
var axios = require('axios');
const URL = 'https://api.coingecko.com/api/v3/coins/list';
var CoinURL = 'https://api.coingecko.com/api/v3/coins/';
AV.init({
    appId: '8TAnh2rAdzkaR8f27BaCWsro-gzGzoHsz',
    appKey: 'SXGHsRIYFPSNG156k3Et4cLD'
})

let resultList = [];
new AV.Query('Coins').descending('createdAt').first().then((res) => {
    res = JSON.parse(res.attributes.list);
    let tempList = [];
    for (var key in res) {
        tempList.push(res[key])
    }
    console.log(tempList.length);
    tempList2 = tempList.slice(1800, 1923);
    tempList2.forEach(item => {
        axios.get(CoinURL + item).then(result => {
            result = result.data;
            // 如果本身没有中文翻译，本地翻译过去，再保存
            // if (result.description.zh.length == 0) {
            google.translate(result.description.en).then(text => {
                let text_zh = '';
                text.result.forEach(textItem => {
                    text_zh = text_zh + textItem
                })
                let CoinText = AV.Object.extend('CoinText');
                let coinText = new CoinText();
                coinText.set('symbol', item).set("text_zh", text_zh).set("text_en", result.description.en);
                coinText.save().then(data => {}, err => {
                    console.log(err)
                })
            })
        }).catch(error => {
            console.log(error)
        });
    })

})

function sleep(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
};