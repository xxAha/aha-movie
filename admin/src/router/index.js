import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Setting from '@/pages/Setting'
import Type from '@/pages/Type/Type'
import TypeList from '@/pages/Type/TypeList'
import Resource from '@/pages/Resource/Resource'
import ResourceList from '@/pages/Resource/ResourceList'
import ChangePassword from '@/pages/ChangePassword'


Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'setting',
          name: 'Setting',
          component: Setting
        },
        {
          path: 'create-type',
          name: 'CreateType',
          component: Type
        },
        {
          path: 'update-type/:id',
          name: 'UpdateType',
          component: Type
        },
        {
          path: 'type-list',
          name: 'TypeList',
          component: TypeList
        },
        {
          path: 'add-resource',
          name: 'AddResource',
          component: Resource
        },
        {
          path: 'update-resource/:id',
          name: 'UpdateResource',
          component: Resource
        },
        {
          path: 'resource-list',
          name: 'ResourceList',
          component: ResourceList
        },
        {
          path: 'change-password',
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
