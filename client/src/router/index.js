import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateCurriculum from '../views/CreateCurriculum.vue'
import DisplayCurriculum from '../views/DisplayCurriculum.vue'
import DisplayCurricula from '../views/DisplayCurricula.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/curricula',
    name: 'Curricula',
    component: DisplayCurricula
  },
  {
    path: '/curriculum/create',
    name: 'Create',
    component: CreateCurriculum
  },
  {
    path: '/curricula/:id',
    name: 'Curriculum',
    component: DisplayCurriculum
  }
]

const router = new VueRouter({
  routes
})

export default router
