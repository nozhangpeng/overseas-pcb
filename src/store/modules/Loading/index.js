import { $utils } from '@helper'
import types from './types'

let nextLoadingId = 1
const { getter, action, mutation } = $utils.importStoreTypes(types).loading

/**
 * initial state
 */
const state = {
  list: [],
  uploadingCount: 0
}

/**
 * getters
 */
const getters = {
  [getter.list]: state => state.list,
  [getter.uploadingCount]: state => state.uploadingCount
}

/**
 * actions
 */
const actions = {
  [action.start] ({ commit }) {
    const loading = {
      id: nextLoadingId++,
      state: 'loading-begin'
    }
    commit(mutation.add, loading)
    window.setTimeout(() => {
      if (loading.state === 'loading-begin') {
        commit(mutation.changeState, { loading, target: 'loading' })
      }
    }, 0)
    return {
      success () {
        commit(mutation.changeState, { loading, target: 'success' })
        window.setTimeout(() => {
          commit(mutation.remove, loading)
        }, 800)
      },
      error () {
        commit(mutation.changeState, { loading, target: 'error' })
        window.setTimeout(() => {
          commit(mutation.remove, loading)
        }, 1500)
      }
    }
  }
}

/**
 * mutations
 */
const mutations = {
  [mutation.changeState] (state, { loading, target }) {
    loading.state = target
  },
  [mutation.add] (state, loading) {
    state.list.push(loading)
  },
  [mutation.remove] (state, loading) {
    state.list.splice(state.list.indexOf(loading), 1)
  },
  [mutation.clearAll] (state) {
    state.list = []
  },
  [mutation.startUpload] (state) {
    state.uploadingCount++
  },
  [mutation.endUpload] (state) {
    state.uploadingCount--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
