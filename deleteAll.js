
const { mongoConnection, DB_NAME, COLLECTION_NAME, SHARD_KEY } = require('./mongoConfig.js')

const createShardKey = (fields, document) => {
  const objShardKey = {}
  fields.forEach(field => {
    objShardKey[field] = document[field]
  });
  return objShardKey
}

const deleteAllWithShardKey = async (shardKeyFields) => {
  const mongoClient = await mongoConnection.connect().catch(err => { console.error(err) })
  const db = await mongoClient.db(DB_NAME)
  const collection = await db.collection(COLLECTION_NAME)
  const docs = await collection.find().toArray()
  console.log(`deleting ${docs.length} docs`)
  for (const doc of docs) {
    const shardKey = createShardKey(shardKeyFields, doc)
    await collection.deleteOne(shardKey)
  }

  mongoClient.close(true)
  console.log('Done!!')
}

deleteAllWithShardKey(SHARD_KEY.split(','))
