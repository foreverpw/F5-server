var xlsx = require('node-xlsx');

const workSheetsFromFile = xlsx.parse(`${__dirname}/agencies.xlsx`);
let list = workSheetsFromFile[0].data
let result = {}
for (let i = i; i < list.length; i++) {
  const row = list[i];
  result
}
