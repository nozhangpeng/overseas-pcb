function validateUpstream (rule, value, callback) {
  if (!value.trim()) {
    callback(new Error('名称不能为空'))
    return
  }
  callback()
}
export const addFormRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'change' }
  ],
  birth: [
    { required: true, message: '请选择出生日期', trigger: 'change' }
  ],
  addr: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ]
}
export const addUpstreamRules = {
  name: [
    { required: true, message: '请输入上游组名称', trigger: 'blur' },
    { validator: validateUpstream }
  ],
  loadBalance: [
    { required: true, message: '请选择loadBalance的值', trigger: 'blur' }
  ]
}
export const copyRules = {
  clusterAlias: [
    { required: true, message: '请选择集群', trigger: 'change' }
  ],
  serviceId: [
    { required: true, message: '请选择服务', trigger: 'change' }
  ]
}
export const addClusterRules = {
  alias: [
    { required: true, message: '请填写集群英文名称', trigger: 'blur' },
    { pattern: /^([a-z0-9]+)(-([a-z0-9]+))*$/, message: '英文名称格式不正确' }
  ],
  name: [
    { required: true, message: '请填写集群名称', trigger: 'blur' }
  ],
  url: [
    { required: true, message: '请填写集群链接', trigger: 'blur' },
    { pattern: /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})?(:\d+)?(\/\w+\.\w+)?$/, message: '链接格式不正确' }
  ],
  accessToken: [
    { required: true, message: '请填写连接串Token', trigger: 'blur' }
  ]
}
export const addUserRules = {
  userId: [
    { required: true, message: '请输入用户AD', trigger: 'change' }
  ]
}
export const updateUserRules = {
  ad: [
    { required: true, message: '请输入用户AD', trigger: 'change' }
  ],
  role: [
    { required: true, message: '请选择用户角色', trigger: 'blur' }
  ]
}
export const addTargetRuled = {
  host: [
    { required: true, message: '请输入服务域名', trigger: 'blur' },
    { pattern: /^(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/, message: '域名格式错误' }
  ],
  port: [
    { required: false, message: '请输入端口号' }
  ],
  path: [
    { required: false, message: '请输入路径' },
    { pattern: /^\//, message: '只能以/开头，例如/hello' }
  ],
  protocol: [
    { required: true, message: '请选择协议', trigger: 'blur' }
  ],
  weight: [
    { required: true, type: 'number', message: '请输入权重', trigger: 'change' }
  ],
  heartbeatPath: [
    { required: true, message: '请输入完整心跳', trigger: 'blur' },
    { pattern: /^\//, message: '只能以/开头，例如/hello' }
  ],
  remark: [
    { required: true, message: '请输入备注', trigger: 'blur' }
  ]
}
export const addPluginRules = {
  name: [
    { required: true, message: '请选择插件名称', trigger: 'change' }
  ],
  config: [
    { required: true, message: '请输入插件配置', trigger: 'blur' }
  ]
}
export const addGlobalPluginRules = {
  name: [
    { required: true, message: '请选择插件名称', trigger: 'change' }
  ],
  config: [
    { required: true, message: '请输入插件配置', trigger: 'blur' }
  ]
}
export const addAppRules = {
  name: [
    { required: true, message: '请选择PAMS应用名称', trigger: 'blur' }
  ],
  pamsId: [
    { required: true, message: '请选择Pams ID', trigger: 'change' }
  ]
}
