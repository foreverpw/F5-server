module.exports = {
  server: {
    port: 12200,
    allowedDomains: [],
    session_secret: '!aj@#3EK!*@#jdj42k-dsl!@AFADS!@#}{$SI'
  },
  redis:{
    host:'localhost',
    port:6379
  },
  mongo: {
    uri: 'mongodb://gaokao:57578180@localhost:28018/gaokao',
  },
  wxapp: {
    appid: 'wxf29c7ba575df67c1',
    secret: '5fe90abe79258d38efe0c5c29ae63c83'
  }
};