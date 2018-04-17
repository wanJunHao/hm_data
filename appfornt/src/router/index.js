import Vue from 'vue'
import Router from 'vue-router'
import outpatient from '@/components/outpatient'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'outpatient',
      component:outpatient
    }
  ]
})