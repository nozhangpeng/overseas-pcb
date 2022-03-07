import Frame from '@views/Home.vue'

export default [
  {
    path: '/user',
    component: Frame,
    children: [
      {
        path: '/user/list',
        meta: {
          title: 'User Manage'
        },
        component: resolve => require(['@views/pages/nav2/Page4.vue'], resolve)
      }
    ]
  }
]
