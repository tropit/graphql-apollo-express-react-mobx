import humps from 'humps'
import _ from 'lodash'

export const orderedFor = (rows, collection, field, singleObject) => {
  // return the rows ordered for the collection
  const data = humps.camelizeKeys(rows)
  const inGroupsOfField = _.groupBy(data, field)
  return collection.map((element) => {
    const elementArray = inGroupsOfField[element]
    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray
    }
    return singleObject ? {} : []
  })
}
export const slug = (str) => str.toLowerCase().replace(/[\s\W-]+/, '-')

export const removeUndefinedValues = (obj) => {
  const newObj = { ...obj }
  Object.entries(newObj).forEach(([ k, v ]) => {
    if (v === undefined) {
      delete newObj[k]
    }
  })
  return newObj
}