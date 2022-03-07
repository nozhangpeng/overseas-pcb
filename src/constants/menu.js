export default [
  {
    path: '/app',
    icon: 'envelope-square',
    label: '导航一',
    super: true,
    children: [
      {
        path: '/app/table',
        icon: 'id-card-o',
        label: 'Table',
        super: false
      },
      {
        path: '/app/form',
        icon: 'id-card-o',
        label: 'Form',
        super: true
      },
      {
        path: '/app/user',
        icon: 'id-card-o',
        label: '列表',
        super: true
      }
    ]
  },
  {
    path: '/user',
    icon: 'address-card',
    label: '用户管理',
    super: true,
    children: [
      {
        path: '/user/list',
        icon: 'users',
        label: '用户列表',
        super: true
      }
    ]
  },
  {
    path: '/cluster',
    icon: 'cog',
    label: '系统管理',
    super: true,
    children: [
      {
        path: '/cluster/list',
        icon: 'cogs',
        label: '系统列表',
        super: true
      }
    ]
  },
  {
    path: '/dashboard',
    icon: 'bar-chart',
    label: 'Charts',
    super: true,
    children: [
      {
        path: '/dashboard/list',
        icon: 'dashboard',
        label: '图表统计',
        super: true
      }
    ]
  }
]
