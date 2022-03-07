export const AppState = {
  ACTIVE: 0, // 启用
  INACTIVE: 1 // 未启用
}
export const TargetHealthStatusMap = function (state) {
  const map = {
    0: {
      name: '未通过',
      tag: 'danger'
    },
    1: {
      name: '通过',
      tag: 'success'
    },
    2: {
      name: '未注册',
      tag: 'info'
    }
  }
  return map[state] || { name: '未知状态', tag: 'primary' }
}
export const TargetProtocolMap = [
  {value: 'http', label: 'HTTP'},
  {value: 'https', label: 'HTTPS'}
]
export const ApiMethodsMap = [
  {value: 'GET', label: 'GET'},
  {value: 'POST', label: 'POST'},
  {value: 'DELETE', label: 'DELETE'},
  {value: 'PATCH', label: 'PATCH'},
  {value: 'PUT', label: 'PUT'}
]
export const TabsNameMap = function (name) {
  const map = {
    'first': {
      tag: '服务详情'
    },
    'second': {
      tag: '上游组列表'
    },
    'third': {
      tag: 'API列表'
    },
    'fourth': {
      tag: '插件列表'
    }
  }
  return map[name] || { tag: '未知列表' }
}
