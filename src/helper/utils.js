import _ from 'lodash'

function serverUrl (path) {
  return `/api/${path}`
}

function setPath (obj, path = [], value) {
  if (!path || !path.length) {
    return obj
  }

  if (!obj) {
    obj = {}
  }

  let child = obj
  let leafPathName = path.pop()

  path.forEach((pathName) => {
    if (!child[pathName]) {
      child[pathName] = {}
    }

    child = child[pathName]
  })
  child[leafPathName] = value
}

function namespacesLeafType (result, types, ancestors = [], sep = '.') {
  for (let key in types) {
    let value = types[key]
    let newAncestors = ancestors.slice()

    newAncestors.push(key)

    if (!value) {
      continue
    }

    if (typeof value === 'string') {
      let path = newAncestors.slice()
      newAncestors.push(value)
      let namespaceValue = newAncestors.join(sep)

      setPath(result, path, namespaceValue)
    } else {
      namespacesLeafType(result, value, newAncestors)
    }
  }
}

function importStoreTypes (types) {
  var result = _.cloneDeep(types)
  namespacesLeafType(result, types)
  Object.freeze(result)
  return result
}

function convertGBToKB (count) {
  return parseInt(count * 1024 * 1024 * 1024)
}

function convertKBToGB (count) {
  return (count / 1024 / 1024 / 1024).toFixed(2)
}

function convertKBWithUnit (count) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = -1
  while (i++ < units.length && count >= 1024) {
    count /= 1024
  }
  return (i > 0 ? count.toFixed(2) : count) + units[i]
}

export default {
  serverUrl,
  importStoreTypes,
  convertGBToKB,
  convertKBToGB,
  convertKBWithUnit
}
