import $ajax from '../ajax'

export default {
  getAll (params) {
    return $ajax({ method: 'GET', url: '/clusters', params })
  },
  add (data) {
    return $ajax({ method: 'POST', url: '/clusters', data })
  },
  remove (Id) {
    return $ajax({ method: 'DELETE', url: `/clusters/${Id}` })
  },
  update (Id, data) {
    return $ajax({ method: 'PATCH', url: `/clusters/${Id}`, data })
  }
}
