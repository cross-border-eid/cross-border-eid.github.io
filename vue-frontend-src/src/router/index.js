import Vue from 'vue'
import Router from 'vue-router'
import Documentation from '@/components/Documentation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Documentation',
      component: Documentation
    }
  ]
})
