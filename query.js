
const { mongoConnection, DB_NAME, COLLECTION_NAME } = require('./mongoConfig.js')
const { writeToFile, groupBy } = require('./utils.js')
const { wellFormedEdifyId } = require('./queries.js')

  
const executeQuery = async (query = {}, fields) => {
  const mongoClient = await mongoConnection.connect().catch(err => { console.error(err) })
  const db = await mongoClient.db(DB_NAME)
  const collection = await db.collection(COLLECTION_NAME)
  const docs = await collection.find(query, { projection: fields }).toArray()
  console.log('Docs', docs.length)
  mongoClient.close(true)
  writeToFile(docs)
}

const executeQueryAgg = async (query = {}) => {
  const mongoClient = await mongoConnection.connect().catch(err => { console.error(err) })
  const db = await mongoClient.db(DB_NAME)
  const collection = await db.collection(COLLECTION_NAME)
  const docs = await collection.aggregate([
    {
      $project: {
        _id: 0,
        id: 1,
        packageTitle: 1,
        opco: 1,
        siteName: 1,
        edifyPackagePath: 1,
        discoPackagePath: 1,
        published: 1,
        timestamp: 1,
        edifyId: { $substr: ['$edifyPackagePath', 0, 36] },
      }
    },
    { $match: query },
  ]).toArray()
  mongoClient.close(true)
  return docs
}

(async () => {
  // const query = { discoPackagePath: { $nin: ['',undefined,null] } }
  // const fields = { edifyPackagePath: 1, discoPackagePath: 1 }
  //executeQuery(query, fields)
  const query = wellFormedEdifyId
  const withEdifyId = await executeQueryAgg(query)
  const diffIds = withEdifyId.filter(doc => doc.id !== doc.edifyId)
  console.log('Docs with diff ids', diffIds.length)
  const grouped = groupBy(diffIds, 'edifyId')
  writeToFile(grouped, 'grouped.json')
})()