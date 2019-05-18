/**
 * Created by xuejiaqi on 20/1/16.
 */
exports.checkAuth = async function (req, res, next) {
    var originUrl = req.originalUrl;
    var whiteList = [
    ];
    var adminAPI = [
    ];
    var appAPI = [
    ];
    var method = req.method.toLowerCase();
    if(method == 'options'){
        return next()
    }
    if (whiteList.indexOf(originUrl) !== -1 && ['post', 'get'].indexOf(method) !== -1) {
        return next();
    } else if (appAPI.indexOf(originUrl) !== -1||adminAPI.indexOf(originUrl) !== -1) {
        var token = req.headers['access-token']||req.query.token;
        let userInfoStr = await red.getAsync(token)
        if(!userInfoStr){
            return res.json({code: ERRORCODE.AUTHENTICATION_FAILED, errorMessage: '未登录，请重新登录'});
        }else{
            var userInfo = JSON.parse(userInfoStr);
            req.userInfo = req.userInfo || {}
            Object.assign(req.userInfo,userInfo)
            next();
        }
    }else{
        return next();
    }
};
