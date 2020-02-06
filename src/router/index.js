import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleEdit from '../components/SimpleEdit'
import ArrayEdit from '../components/ArrayEdit'
import DefaultValueArrayEdit from '../components/DefaultValueArrayEdit'
import DefaultValueComplexArrayEdit from '../components/DefaultValueComplexArrayEdit'
import TreeEdit from '../components/TreeEdit'
import ObjectWithNoValuesEdit from '../components/ObjectWithNoValuesEdit'
import SimpleDefaultValueEdit from '../components/SimpleDefaultValueEdit'
import AdditionalPropsEdit from '../components/AdditionalPropsEdit'
import DialogEdit from '../components/DialogEdit'
import ComplexArrayDialogEdit from '../components/ComplexArrayDialogEdit'
import ObjectWithChildrenEdit from '../components/ObjectWithChildrenEdit'
import NonExistingArrayEdit from '../components/NonExistingArrayEdit'
import NonExistingComplexArrayDialogEdit from '../components/NonExistingComplexArrayDialogEdit'
import NonExistingComplexObjectDialogEdit from '../components/NonExistingComplexObjectDialogEdit'

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
    path: '/simple-default-value-edit',
    name: 'simple-default-value-edit',
    component: SimpleDefaultValueEdit
  },
  {
    path: '/additional-props-edit',
    name: 'additional-props-edit',
    component: AdditionalPropsEdit
  },
  {
    path: '/dialog-edit',
    name: 'dialog-edit',
    component: DialogEdit
  },
  {
    path: '/non-existing-array-edit',
    name: 'non-existing-array-edit',
    component: NonExistingArrayEdit
  },
  {
    path: '/non-existing-complex-array-edit',
    name: 'non-existing-complex-array-edit',
    component: NonExistingComplexArrayDialogEdit
  },
  {
    path: '/non-existing-complex-object-edit',
    name: 'non-existing-complex-object-edit',
    component: NonExistingComplexObjectDialogEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
