import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleEdit from '../components/SimpleEdit'
import ArrayEdit from '../components/ArrayEdit'
import DefaultValueArrayEdit from '../components/DefaultValueArrayEdit'
import DefaultValueComplexArrayEdit from '../components/DefaultValueComplexArrayEdit'
import TreeEdit from '../components/TreeEdit'
import ObjectWithNoValuesEdit from '../components/ObjectWithNoValuesEdit'
import SimpleDefaultValueEdit from '../components/SimpleDefaultValueEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/simple-edit'
  },
  {
    path: '/simple-edit',
    name: 'simple-edit',
    component: SimpleEdit
  },
  {
    path: '/array-edit',
    name: 'array-edit',
    component: ArrayEdit
  },
  {
    path: '/default-value-array-edit',
    name: 'default-value-array-edit',
    component: DefaultValueArrayEdit
  },
  {
    path: '/default-value-complex-array-edit',
    name: 'default-value-complex-array-edit',
    component: DefaultValueComplexArrayEdit
  },
  {
    path: '/tree-edit',
    name: 'tree-edit',
    component: TreeEdit
  },
  {
    path: '/object-with-no-values-edit',
    name: 'object-with-no-values-edit',
    component: ObjectWithNoValuesEdit
  },
  {
    path: '/simple-default-value-edit',
    name: 'simple-default-value-edit',
    component: SimpleDefaultValueEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
