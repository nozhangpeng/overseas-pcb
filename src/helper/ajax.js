import { Message } from 'element-ui'
import axios from 'axios'

import { $loading } from '@helper'

/**
 * @desc 发起ajax请求 最外层wrapper 支持自动提示错误等
 * @param {Object} opts 同axios的opts 并追加参数autoErrMsg
 * @return {Any} resData/undefined
 */
export default async opts => {
  // 根据具体业务逻辑制定 如何处置resolve和reject
  try {
    const options = {
      baseURL: '/api',
      timeout: 5000,
      ...opts
    }
    let response
    if (!options.notLoading) {
      await $loading(async () => {
        response = await axios(options)
      })
    } else {
      response = await axios(options)
    }
    if (response.data) {
      if (response.status === 200) {
        return response.data
      } else {
        if (response.status === -12) {
          window.location = `/api/login`
        }
        throw new Error(response.data.message)
      }
    }
  } catch (err) {
    if (opts.autoErrMsg !== false) {
      let msg = `${err}`
      if (err) msg = err.message || msg
      if (err.response) msg = `${err.response.statusText} ${err.response.status}` || msg
      if (err.response && err.response.data && err.response.data.message) msg = `${err.response.data.message} ${err.response.data.status}` || msg
      Message.error(msg)
    }
    throw err
  }
}
