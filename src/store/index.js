import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import objectPath from 'object-path'

// modules
import modules from './modules/index'
// install
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const options = {
  key: 'client-gateway-admin-fe-store',
  paths: ['Loading'],
  reducer (state, paths) {
    const stateCopy = JSON.parse(JSON.stringify(state))
    for (const path of paths) {
      objectPath.del(stateCopy, path)
    }
    return stateCopy
  }
}

export default new Vuex.Store({
  actions,
  getters,
  modules,
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState(options)] : [createPersistedState(options)]
})



