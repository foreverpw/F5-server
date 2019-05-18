/**
 * Created by xuejiaqi on 21/1/16.
 */
var config = require('../config');
module.exports = function (req, res, next) {
    // console.log(req.headers.origin);
    var origin = req.headers.origin;
    if (config.server.allowedDomains.indexOf(origin) !== -1 || /^http:\/\/localhost/.test(origin)) {
    //if(true) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Max-Age', 3600);
    }
    next();
};