const one = require('../model/readJson');
let path = '/etc/v2ray/config.json'
// const ip = require('ip');
const publicIp = require('public-ip');
const Base = require('js-base64');
const uuidv1 = require('uuid/v1');

// 获取原生v2ray json配置文件
const getJson = async(ctx) => {
    ctx.response.type = 'application/json';
    ctx.body = await one.fileRead(path);
};

const getVQRCode = async(ctx) => {
    ctx.response.type = 'text/plain; charset=utf-8';
    let QRJson = {},
    RowJson = await one.fileRead(path);
    QRJson.add = await publicIp.v4()
    QRJson.aid = String(RowJson.inbound.settings.clients[0].alterId);
    QRJson.host = '';
    QRJson.id = RowJson.inbound.settings.clients[0].id;

    try {QRJson.net = RowJson.inboundDetour.streamSettings}catch(e){
        console.log(e);
        QRJson.net = 'tcp';
    }
    // QRJson.net = RowJson.inboundDetour.streamSettings || 'tcp';
    QRJson.port = RowJson.inbound.port;
    QRJson.ps = await publicIp.v4()
    QRJson.tls = '';
   try{QRJson.type = RowJson.inbound.streamSettings.header.type;}catch(e){
       console.log(e);
       QRJson.type = 'none';
   }
   console.log(QRJson);
  

    let V2rayString = 'vmess://' + Base.Base64.encode(JSON.stringify(QRJson));
    ctx.body = V2rayString;
    
}

const getV2rayRocketQR = async(ctx) => {
    ctx.response.type = 'text/plain; charset=utf-8';
    RowJson = await one.fileRead(path);
    // let security = RowJson.inbound.settings.clients[0].security;
    let security = 'aes-128-cfb';
    let uuid = RowJson.inbound.settings.clients[0].id;
    // let ipAddress = ''
    let ipAddress =  await publicIp.v4()
    publicIp.v4().then(ipAddress => {
        console.log(ipAddress)
    });
    console.log(ipAddress);
    let port = RowJson.inbound.port;
    remarks = 'remarks=' + ipAddress;

    try{ 
        type = '&obfs=' + RowJson.inbound.streamSettings.header.type;}
    catch(e){
        console.log('here is no http or wechat obfs');
        type = '';
    }
    let V2rayRocketQR = 'vmess://' + Base.Base64.encode(security + ':' + uuid + '@' + ipAddress + ':' + port) + '?'+ remarks + type;
    ctx.body = V2rayRocketQR;
    console.log('V2rayRocketQR: ' + V2rayRocketQR);
    console.log('.............................................')
    // console.log(uuidv1());
    // todo 暂时shadowrocket 不支持 kcp
}



module.exports = {
    getJson,
    getVQRCode,
    getV2rayRocketQR
}