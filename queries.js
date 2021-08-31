// Get all translations of a given list of packages between to given dates
const translationsOfPackaesInPeriod = (from, to, ids)=> ({
  timestamp: { $gt: new Date(from), $lt: new Date(to) },
  id: { $in: ids }
})

const wellFormedEdifyId = { edifyId: { $regex: /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/ } }

const recordsWithoutMapping = from => ({ 
    "errors.message": "Package that requires new Ids with no mapping file found. Original msg: Unexpected status code: 404",
    timestamp: { $gte: new Date(from) }
})

const serachByEdifyPackagePath = packageId => ({
     edifyPackagePath: `/${packageId}/`
})

module.exports = {
    translationsOfPackaesInPeriod,
    recordsWithoutMapping,
    serachByEdifyPackagePath,
    wellFormedEdifyId
}