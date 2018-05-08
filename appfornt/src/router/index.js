import Vue from 'vue'
import Router from 'vue-router'
import outpatient from '@/components/outpatient'
import remind from '@/components/remind'
import statistical from '@/components/statistical'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'outpatient',
      component:outpatient
    },
    {
     path:'/remind',
      name: 'remind',
      component:remind    	
    },
    {
     path:'/statistical',
      name: 'statistical',
      component:statistical    	
    },
  ]
})
