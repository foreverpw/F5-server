const rp = require('request-promise');
const config = require('../config').wxapp
const redisConfig = require('../config').redis
global.Promise = require("bluebird");
var redis = require('redis');
Promise.promisifyAll(redis);

var red = redis.createClient(redisConfig.port,redisConfig.host);

const ACCESS_TOKEN_REDIS_KEY = 'wx_access_token'

module.exports.getWXAccessToken = async function(){
  let accessToken = await red.getAsync(ACCESS_TOKEN_REDIS_KEY)
  if(accessToken){
    logger.info(`get redis wx access_token:${accessToken}`)
    return accessToken
  }else{
    logger.info(`refresh wx access_token`)
    let params = {
      'grant_type': 'client_credential',
      'appid': config.appid,
      'secret': config.secret
    }
    let resp = await rp.get({
      uri:'https://api.weixin.qq.com/cgi-bin/token',
      json: true,
      qs: params
    })
    accessToken = resp.access_token
    let timeout = resp.expires_in-60;
    logger.info(`get new wx access_token:${accessToken}`)
    if(accessToken){
      red.set(ACCESS_TOKEN_REDIS_KEY, accessToken, 'EX', timeout);
    }
  }
}
