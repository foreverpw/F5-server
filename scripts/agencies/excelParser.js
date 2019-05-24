var xlsx = require('node-xlsx');

const workSheetsFromFile = xlsx.parse(`${__dirname}/agencies.xlsx`);
let list = workSheetsFromFile[0].data
let result = {}
for (let i = 1; i < list.length; i++) {
  const row = list[i];
  result[row[4]] = result[row[4]] || []
  result[row[4]].push({
    shnumber:row[0],
    shortName:row[1],
    name:row[2],
    province:row[3],
    city:row[4]
  })
}
console.log(JSON.stringify(result))
