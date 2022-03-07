/*
* 路由跳转权限控制
*/

export default {
  async checkPageAuth (to, from, next) {
    // TODO: check page auth here
    if (to.path == '/login') {
      sessionStorage.removeItem('user')
    }
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (!user && to.path != '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
    // next()
  },
  async setTitle (to, from, next) {
    if (to.meta && to.meta.title) {
      document.title = `${to.meta.title} | Test Template` // replace of system name
    }
    next()
  }
}
