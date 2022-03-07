import $ajax from '../ajax'

export default {
  getAll (params) {
    return $ajax({ method: 'GET', url: '/consumers', params })
  },
  getConsumer (Id) {
    return $ajax({ method: 'GET', url: `/consumers/${Id}` })
  },
  addConsumer (data) {
    return $ajax({ method: 'POST', url: '/consumers', data })
  },
  removeConsumer (Id) {
    return $ajax({ method: 'DELETE', url: `/consumers/${Id}` })
  }
}
