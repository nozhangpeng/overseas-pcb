import store from '@store'

export default async action => {
  const loading = await store.dispatch('loading.action.start.start')
  try {
    await action()
    loading.success()
  } catch (e) {
    loading.error()
    throw e
  }
}
