/**
 * Created by Andy on 2017/9/22.
 */
var config = require('../config.js')
const soap = require('soap');

exports.submitCRM = function (req, res) {
  var url = config.soap.url;
  var saleClueJson = [{
    "Contact": "18311111111",  //客户手机号
    "CustomerName": "test",    //客户姓名
    "Province": "江苏省",     //省
    "City": "苏州市",             //市
    "Shnumber": "340204",      //专营店号
    "TypeName": "厂家线索",       //主渠道
    "Channels": "官网",           //二级渠道
    "ChildChannel": "官网活动",    //三级渠道
    "IntentBrandId": 69,        //品牌ID
    "IntentBrandName": "哈弗 F5", //品牌名称
    "Remark": "互联网广告",        //备注
    "ActivitiesName": "虎扑APP-哈弗F5 5-6月互联网传播",  //渠道信息+活动周期+活动车型+活动描述
    "OrderType": "整车"                       //售前线索-整车，售后-保养/预约/维修等
  }]
  var para = {
    saleClueJson: JSON.stringify(saleClueJson),
    productJson: '',
    productBoutiqueJson: '',
    LeadChannelType: '官网'
  }
  soap.createClient(url, function (err, client) {
    if(err){
      return res.json({code: ERRORCODE.CREATE_FAILED});
    }
    let soapHeader = {
      "CustomSoapHeader": {
        "UserIdentity": "IT2015"
      }
    };
    client.addSoapHeader(soapHeader, 'CustomSoapHeader', 'm', 'http://tempuri.org/');
    client.SaveChannelWithJson(para, function (err, result, rawResponse, soapHeader, rawRequest) {
      if(err){
        return res.json({code: ERRORCODE.CREATE_FAILED});
      }
      return res.json({ code: ERRORCODE.SUCCESS, result: result });
    });
  });
}
