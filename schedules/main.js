var schedule = require("node-schedule");
global.logger = require('../config/winston');
global.db = require('../db');
var {sendGroupNewsMsg} = require('../service/templateMessage');
const dayjs = require('dayjs')
const rp = require('request-promise');
const MongoClient = require('mongodb').MongoClient;
const {NEWS_TYPES} = require('../config/constant')

const url = 'mongodb://admin:57578180@47.101.217.149:28018';
const dbName = 'gaokao';

logger.info('schedule loaded!')
schedule.scheduleJob('0 * * * *', crawlNews);

async function crawlNews(){ //志愿填报186   国际教育653  自主招生256  综合评价608
  logger.info('crawl news trigger!')

  let client = await MongoClient.connect(url)
  let db = client.db(dbName)
  const col = db.collection('news');

  let ids = NEWS_TYPES.map(t=>t.id)
  let tasks = ids.map(classId=>crawlNewsByClassId(classId,col))
  let result = await Promise.all(tasks)

  client.close()
}

async function crawlNewsByClassId(classId,col){
  let news = []
  let end = false
  let page = 1
  while(!end){
    try {
      let result = await rp.post({
        uri: 'https://api.eol.cn/zsgk/api',
        body: {
          "page": page,
          "pro_class_id": classId,
          "size": 5,
          "type": 2,
          "uri": "gksjk/api/news/lists"
        },
        timeout:1000,
        json: true // Automatically stringifies the body to JSON
      })
      logger.info(`requested news api for classId ${classId} for page ${page}`)
      end = result.data.docs.length==0
      if(!end){
        for (let i = 0; i < result.data.docs.length; i++) {
          const d = result.data.docs[i];
          let doc = await col.findOne({news_id:d.news_id})
          if(!doc){
            logger.info(`find new news id ${d.news_id}`)
            news.push(d)
          }else{
            end = true
            logger.info(`request end for classId ${classId}`)
            break;
          }
        }
      }else{
        logger.info(`request end for classId ${classId}`)
      }
      page++
    } catch (error) {
      
    }
  }
  if(news.length){
    let details = await Promise.all(news.map(doc=>getNewsDetail(doc.news_id)))
    let inserts = details.map((d,i)=>{
      Object.assign(d,news[i]);
      ['publish_time','add_time','update_time','times'].forEach(field=>{
        d[field] = dayjs(d[field]).subtract(480,'minute').toDate() //480 东八区
      })
      if(typeof d.read_num=='string'){
        d.read_num = parseInt(Number(d.read_num.split('万')[0])*10000)
      }
      return d
    })
    let insertResult = await col.insertMany(inserts)
    for (const key in insertResult.insertedIds) {
      if (insertResult.insertedIds.hasOwnProperty(key)) {
        const id = insertResult.insertedIds[key];
        sendGroupNewsMsg(id) //async run 
      }
    }
    logger.info(`inserted news for classId ${classId}`)
  }
}
// crawlNews()

async function getNewsDetail(id){
  let detail = await rp.get({
    uri: `https://static-gkcx.eol.cn/www/json/news/${id}.json`
  })
  return JSON.parse(detail)
}

