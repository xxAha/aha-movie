import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Setting from '@/pages/Setting'
import CreateType from '@/pages/Type/CreateType'
import TypeList from '@/pages/Type/TypeList'
import UpdateType from '@/pages/Type/UpdateType'
import Resource from '@/pages/Resource/Resource'
import ResourceList from '@/pages/Resource/ResourceList'
import ChangePassword from '@/pages/ChangePassword'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/setting',
          name: 'Setting',
          component: Setting
        },
        {
          path: '/create-type',
          name: 'CreateType',
          component: CreateType
        },
        {
          path: '/type-list',
          name: 'TypeList',
          component: TypeList
        },
        {
          path: '/update-type',
          name: 'UpdateType',
          component: UpdateType
        },
        {
          path: '/resource-list',
          name: 'ResourceList',
          component: ResourceList
        },
        {
          path: '/add-resource',
          name: 'AddResource',
          component: Resource
        },
        {
          path: '/update-resource/:id',
          name: 'UpdateResource',
          component: Resource
        },
        {
          path: '/change-password',
          name: 'ChangePassword',
          component: ChangePassword
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
