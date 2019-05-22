/**
 * Created by Andy on 2017/9/22.
 */

exports.submitCRM = function (req, res) {
    var url = 'http://crmvoiceservice.gwmsystem.com:8034/WebChannels.asmx?wsdl';
    var saleClueJson = [
        {
            "TypeName": "厂家线索",
            "ShopID": 2927,
            "Shnumber": "",
            "OrderType": "整车",
            "Channels": "官网",
            "ChildChannel": "官网活动",
            "IntentBrandID": "34",
            "IntentBrandName": "哈弗H6升级版",
            "CustomerName": "计先生",
            "Contact": "15826893293",
            "Province": "河北省",
            "City": "保定市",
            "Gender": 1,
            "Remark": "互联网广告",
            "ActivitiesName": "渠道名+专题活动"
        },
        {
            "TypeName": "厂家线索",
            "ShopID": 2927,
            "Shnumber": "",
            "OrderType": "整车",
            "Channels": "官网",
            "ChildChannel": "官网活动",
            "IntentBrandID": "34",
            "IntentBrandName": "哈弗H6升级版",
            "CustomerName": "计先生",
            "Contact": "15826893294",
            "Province": "河北省",
            "City": "保定市",
            "Gender": 1,
            "Remark": "互联网广告",
            "ActivitiesName": "渠道名+专题活动"
        }
    ]
    var para = {
        saleClueJson: JSON.stringify(saleClueJson),
        productJson: '',
        productBoutiqueJson: '',
        LeadChannelType: 'test'
    }
    soap.createClient(url, function(err, client) {
        var soapHeader = {
            "UserIdentity": "IT2015"
        };
        client.addSoapHeader(soapHeader);
        // client.addSoapHeader('UserIdentity', 'IT2015');
        client.SaveChannelWithJson(para, function(err, result) {
            console.log('111');
            return res.json({code: ERRORCODE.SUCCESS, result: result});
        });
    });
}