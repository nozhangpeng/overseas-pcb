import $ajax from '../ajax'
let base = ''
export default {
  requestLogin (data) {
    return $ajax({ method: 'POST', url: `${base}/login`, data })
  },
  getUserList (params) {
    return $ajax({ method: 'GET', url: `${base}/user/list`, params })
  },
  getUserListPage (params) {
    return $ajax({ method: 'GET',  url: `${base}/user/listpage`, params })
  },
  removeUser (params) {
    return $ajax({ method: 'GET', url: `${base}/user/remove`, params })
  },
  batchRemoveUser (params) {
    return $ajax({ method: 'GET', url: `${base}/user/batchremove`, params })
  },
  editUser (params) {
    return $ajax({ method: 'GET', url: `${base}/user/edit`, params })
  },
  addUser (params) {
    return $ajax({ method: 'GET', url: `${base}/user/add`, params })
  }
}
