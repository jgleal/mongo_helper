const fs = require('fs')
const readline = require("readline")

const rlInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const createShardKey = (fields, document) => {
  const objShardKey = {}
  fields.forEach(field => {
    objShardKey[field] = document[field]
  });
  return objShardKey
}

const writeToFile = (result, filename = 'result.json') =>
  fs.writeFile(filename, JSON.stringify(result), err => {
  if (err) {
    console.error(err)
    return
  }
})
const groupCount = docs => {
  let counts = {}
  docs.map(doc => doc.id).forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  })
  return counts
}
const groupBy = (items, key) => {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  )
}

module.exports= {createShardKey, rlInput, writeToFile, groupCount, groupBy}