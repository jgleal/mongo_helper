// Get all translations of a given list of packages between to given dates
const translationsOfPackaesInPeriod = (from, to, ids)=> ({
  timestamp: { $gt: ISODate(from), $lt: ISODate(to) },
  id: { $in: ids }
})

const wellFormedEdifyId = { edifyId: { $regex: /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/ } }

module.exports = { translationsOfPackaesInPeriod, wellFormedEdifyId }