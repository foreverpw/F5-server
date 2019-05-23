/**
 * Created by Andy on 2017/9/22.
 */

exports.submitCRM = function (req, res) {
  var url = 'http://crmvoiceservice.gwmsystem.com:8034/WebChannels.asmx?wsdl';
  var saleClueJson = [{
      "Contact": "18311111111",
      "CustomerName": "test",
      "Shnumber": "110122",
      "TypeName": "厂家线索",
      "Channels": "官网",
      "ChildChannel": "官网活动",
      "IntentBrandId": "62",
      "IntentBrandName": "WEY VV5",
      "Remark": "互联网广告",
      "ActivitiesName": "百度-m-VV5 1-2月互联网传播",
      "OrderType": "整车"
    }]
  var para = {
    saleClueJson: JSON.stringify(saleClueJson),
    productJson: '',
    productBoutiqueJson: '',
    LeadChannelType: '官网'
  }
  soap.createClient(url, function (err, client) {
    let soapHeader = {
      "CustomSoapHeader": {
        "UserIdentity": "IT2015"
      }
    };
    client.addSoapHeader(soapHeader, 'CustomSoapHeader', 'm', 'http://tempuri.org/');
    client.SaveChannelWithJson(para, function (err, result, rawResponse, soapHeader, rawRequest) {
      return res.json({code: ERRORCODE.SUCCESS, result: result});
    });
  });
}
