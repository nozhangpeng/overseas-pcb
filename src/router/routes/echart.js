import Frame from '@views/Home.vue'

export default [
  {
    path: '/dashboard',
    component: Frame,
    children: [
      {
        path: '/dashboard/list',
        meta: {
          title: 'Echart Manage'
        },
        component: resolve => require(['@views/pages/charts/echarts.vue'], resolve)
      }
    ]
  }
]
