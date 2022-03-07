import { $utils } from '@helper'
import types from './types'

const { getter, mutation } = $utils.importStoreTypes(types).user

const state = {
  user: {
    id: 1
  }
}

const getters = {
  [getter.user]: state => state.user
}

const mutations = {
  [mutation.update] (state, user) {
    state.user = user
    // state.status = Object.assign(state.user, user)
  }
}

export default {
  state,
  getters,
  mutations
}
