

const { mongoConnection, DB_NAME, COLLECTION_NAME, SHARD_KEY } = require('./mongoConfig.js')
const { createShardKey, rlInput } = require('./utils.js')


const deleteAllWithShardKey = async (shardKeyFields) => {
  const mongoClient = await mongoConnection.connect().catch(err => { console.error(err) })
  const db = await mongoClient.db(DB_NAME)
  const collection = await db.collection(COLLECTION_NAME)
  const docs = await collection.find().toArray()
  rlInput.question(`[WARNING] Are you sure you want to delete ALL (${docs.length}) documents? (y/n) `, async answer => {
    if (answer === 'y') {
      console.log(`Deleting ${docs.length} docs`)
      for (const doc of docs) {
        const shardKey = createShardKey(shardKeyFields, doc)
        await collection.deleteOne(shardKey)
      }
      console.log('Done!!')
    } else {
      console.log('[CANCELED] No docs deleted')
    }
    rlInput.close()
    mongoClient.close(true)
  })
}

deleteAllWithShardKey(SHARD_KEY.split(','))
