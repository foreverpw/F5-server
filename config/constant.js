module.exports.PROVINCES = [{ "code": "11", "name": "北京市" }, { "code": "12", "name": "天津市" }, { "code": "13", "name": "河北省" }, { "code": "14", "name": "山西省" }, { "code": "15", "name": "内蒙古自治区" }, { "code": "21", "name": "辽宁省" }, { "code": "22", "name": "吉林省" }, { "code": "23", "name": "黑龙江省" }, { "code": "31", "name": "上海市" }, { "code": "32", "name": "江苏省" }, { "code": "33", "name": "浙江省" }, { "code": "34", "name": "安徽省" }, { "code": "35", "name": "福建省" }, { "code": "36", "name": "江西省" }, { "code": "37", "name": "山东省" }, { "code": "41", "name": "河南省" }, { "code": "42", "name": "湖北省" }, { "code": "43", "name": "湖南省" }, { "code": "44", "name": "广东省" }, { "code": "45", "name": "广西壮族自治区" }, { "code": "46", "name": "海南省" }, { "code": "50", "name": "重庆市" }, { "code": "51", "name": "四川省" }, { "code": "52", "name": "贵州省" }, { "code": "53", "name": "云南省" }, { "code": "54", "name": "西藏自治区" }, { "code": "61", "name": "陕西省" }, { "code": "62", "name": "甘肃省" }, { "code": "63", "name": "青海省" }, { "code": "64", "name": "宁夏回族自治区" }, { "code": "65", "name": "新疆维吾尔自治区" }]

module.exports.PROVINCES_MAX_SCORE={
  31:660,
  32:480,
  33:810,
  46:940,  //900
  53:772
}

module.exports.TYPES = {
  5000: '综合',
  5001: '理工',
  5002: '农林',
  5003: '医药',
  5004: '师范',
  5005: '语言',
  5006: '财经',
  5007: '政法',
  5008: '体育',
  5009: '艺术',
  5010: '民族',
  5011: '军事',
  5012: '其他',
}

module.exports.SCHOOL_TYPES = {
  6000: '本科',
  6001: '专科',
  6002: '独立院校',
  6003: '中外合资办学',
  6007: '其他',
}

module.exports.SPECIALS = [
  { name: "哲学", code: "01", spe_id: "3" },
  { name: "经济学", code: "02", spe_id: "4" },
  { name: "法学", code: "03", spe_id: "5" },
  { name: "教育学", code: "04", spe_id: "6" },
  { name: "文学", code: "05", spe_id: "7" },
  { name: "历史学", code: "06", spe_id: "8" },
  { name: "理学", code: "07", spe_id: "9" },
  { name: "工学", code: "08", spe_id: "10" },
  { name: "农学", code: "09", spe_id: "11" },
  { name: "医学", code: "10", spe_id: "12" },
  { name: "管理学", code: "12", spe_id: "13" },
  { name: "艺术学", code: "13", spe_id: "14" },
  { name: "农林牧渔大类", code: "51", spe_id: "15" },
  { name: "资源环境与安全大类", code: "52", spe_id: "16" },
  { name: "能源动力与材料大类", code: "53", spe_id: "17" },
  { name: "土木建筑大类", code: "54", spe_id: "18" },
  { name: "水利大类", code: "55", spe_id: "19" },
  { name: "装备制造大类", code: "56", spe_id: "20" },
  { name: "生物与化工大类", code: "57", spe_id: "21" },
  { name: "轻工纺织大类", code: "58", spe_id: "22" },
  { name: "食品药品与粮食大类", code: "59", spe_id: "23" },
  { name: "交通运输大类", code: "60", spe_id: "24" },
  { name: "电子信息大类", code: "61", spe_id: "25" },
  { name: "医药卫生大类", code: "62", spe_id: "26" },
  { name: "财经商贸大类", code: "63", spe_id: "27" },
  { name: "旅游大类", code: "64", spe_id: "28" },
  { name: "文化艺术大类", code: "65", spe_id: "29" },
  { name: "新闻传播大类", code: "66", spe_id: "30" },
  { name: "教育与体育大类", code: "67", spe_id: "31" },
  { name: "公安与司法大类", code: "68", spe_id: "32" },
  { name: "公共管理与服务大类", code: "69", spe_id: "33" }
]

module.exports.STUDENT_TYPES = [
  { name: "文科", id: 2 },
  { name: "理科", id: 1 },
  { name: "艺术类", id: 4 },
  { name: "体育类", id: 5 },
  { name: "综合", id: 3 }
]

module.exports.BATCH_IDS = [
  {name:'本科提前批',id:6},
  {name:'本科一批',id:7},
  {name:'本科二批',id:8},
  {name:'地方专项计划本科批',id:13},
  {name:'专科提前批',id:11},
  {name:'专科批',id:10}
]

//志愿填报186   国际教育653  自主招生256  综合评价608
module.exports.NEWS_TYPES=[
  {
    id:467,
    name:'推荐'
  },{
    id:186,
    name:'志愿填报'
  },{
    id:653,
    name:'国际教育'
  },{
    id:256,
    name:'自主招生'
  },{
    id:608,
    name:'综合评价'
  }
]