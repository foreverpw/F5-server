var config = require('../../config').wxapp
const {Wechat} = require('wechat-jssdk');
const rp = require('request-promise');
var coordtransform=require('coordtransform');

var wechatConfig = {
  appId:config.appid,
  appSecret:config.secret
}

const wx = new Wechat(wechatConfig);

exports.getSignature = async function (req, res) {
  let signatureData = await wx.jssdk.getSignature(req.body.url)
  return res.json({ code: ERRORCODE.SUCCESS, data: signatureData });
};

exports.getLocation = async function (req, res) {
  let {longitude,latitude} = req.body
  // var gcj02tobd09 = coordtransform.gcj02tobd09(longitude,latitude)
  // newLocations = coordtransform.gcj02tobd09(newLocations[0],newLocations[1])
  // [longitude,latitude] = gcj02tobd09
  let url = 'https://api.map.baidu.com/geocoder/v2/?ak=hTtFgDnayWhDNycGArDQmy3utWgsYSpQ&location=' + latitude + ',' + longitude + '&output=json&coordtype=wgs84ll';
  let result = await rp.post({
    uri: url,
    body: {},
    json: true // Automatically stringifies the body to JSON
  })
  return res.json({ code: ERRORCODE.SUCCESS, data: result.result });
};

