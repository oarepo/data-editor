import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleEdit from '../components/SimpleEdit'
import ArrayEdit from '../components/ArrayEdit'
import DefaultValueArrayEdit from '../components/DefaultValueArrayEdit'
import DefaultValueComplexArrayEdit from '../components/DefaultValueComplexArrayEdit'
import TreeEdit from '../components/TreeEdit'
import ObjectWithNoValuesEdit from '../components/ObjectWithNoValuesEdit'
import AdditionalPropsEdit from '../components/AdditionalPropsEdit'
import ComplexArrayDialogEdit from '../components/ComplexArrayDialogEdit'
import ObjectWithChildrenEdit from '../components/ObjectWithChildrenEdit'
import NonExistingDefaultValueArrayEdit from '../components/NonExistingDefaultValueArrayEdit'
import NonExistingComplexArrayDialogEdit from '../components/NonExistingComplexArrayDialogEdit'
import NonExistingObjectDialogEdit from '../components/NonExistingObjectDialogEdit'
import NonExistingDefaultValueComplexArrayEdit from '../components/NonExistingDefaultValueComplexArrayEdit'
import NonExistingObjectDefaultValueEdit from '../components/NonExistingObjectDefaultValueEdit'

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
    path: '/complex-array-dialog-edit',
    name: 'complex-array-dialog-edit',
    component: ComplexArrayDialogEdit
  },
  {
    path: '/tree-edit',
    name: 'tree-edit',
    component: TreeEdit
  },
  {
    path: '/object-with-children-edit',
    name: 'object-with-children-edit',
    component: ObjectWithChildrenEdit
  },
  {
    path: '/object-with-no-values-edit',
    name: 'object-with-no-values-edit',
    component: ObjectWithNoValuesEdit
  },
  {
    path: '/additional-props-edit',
    name: 'additional-props-edit',
    component: AdditionalPropsEdit
  },
  {
    path: '/non-existing-default-value-array-edit',
    name: 'non-existing-default-value-array-edit',
    component: NonExistingDefaultValueArrayEdit
  },
  {
    path: '/non-existing-default-value-complex-array-edit',
    name: 'non-existing-default-value-complex-array-edit',
    component: NonExistingDefaultValueComplexArrayEdit
  },
  {
    path: '/non-existing-complex-array-edit',
    name: 'non-existing-complex-array-edit',
    component: NonExistingComplexArrayDialogEdit
  },
  {
    path: '/non-existing-object-dialog-edit',
    name: 'non-existing-object-dialog-edit',
    component: NonExistingObjectDialogEdit
  },
  {
    path: '/non-existing-object-default-value-edit',
    name: 'non-existing-object-default-value-edit',
    component: NonExistingObjectDefaultValueEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
