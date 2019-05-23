module.exports = {
  server: {
    port: 12200,
    allowedDomains: ['http://127.0.0.1:1234','http://192.168.3.130:1234','http://192.168.11.3:1234','http://hupu.ksspark.cn','http://hupu-test.ksspark.cn'],
    session_secret: '!aj@#3EK!*@#jdj42k-dsl!@AFADS!@#}{$SI'
  },
  redis:{
    host:'localhost',
    port:6379
  },
  mongo: {
    uri: 'mongodb://gaokao:57578180@47.101.217.149:28018/gaokao',
  },
  wxapp: {
    appid: 'wx7c9f71980a7f94a5',
    secret: '3f2e9670822b65703f917d7b2f242d01'
  },
  soap:{
    url:'http://webscrmworkorder.gwmsystem.com:5691/WebChannel/WebChannels.asmx?wsdl'
  }
};