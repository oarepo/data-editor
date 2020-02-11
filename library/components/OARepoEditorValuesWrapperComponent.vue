<template lang="pug">
component(:is="component")
  slot
  add-array-item-component(v-bind="$props" v-if='isArray')
  add-object-property-component(v-bind="$props" v-if='isUndefinedObjectOrValue && !hasAdditionalProps')
  add-additional-property-component(v-bind="$props" v-if="hasAdditionalProps && !isArray")
</template>
<script>

import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent.vue'
import { SKIP_WRAPPER } from '@oarepo/data-renderer'
import AddArrayItemComponent from './AddArrayItemComponent'
import AddObjectPropertyComponent from './AddObjectPropertyComponent'
import AddAdditionalPropertyComponent from './AddAdditionalPropertyComponent'

export default {
  props: {
    context: [Object, Array],
    layout: Object,
    data: Object,
    paths: Array,
    value: {},
    url: String,
    values: Array,
    pathValues: Array,
    pathLayouts: [Object, Array],
    schema: String,
    currentSchema: Object,
    valueIndex: Number,
    parentJSONPointer: String,
    submit: Function,
    cancel: Function,
    dialogComponent: Object
  },
  components: {
    'add-array-item-component': AddArrayItemComponent,
    'add-object-property-component': AddObjectPropertyComponent,
    'add-additional-property-component': AddAdditionalPropertyComponent,
    'oarepo-editor-wrapper': OARepoEditorWrapperComponent
  },
  name: 'oarepo-record-inplace-editor-values-wrapper-component',
  computed: {
    component () {
      const ret = this.layout['value-wrapper-viewer']['component'] || this.layout['value-wrapper-viewer']['element']
      return ret !== SKIP_WRAPPER ? ret : 'div'
    },
    isArray () {
      return this.layout.array || (this.pathValues && this.pathValues.length && Array.isArray(this.pathValues[0].value))
    },
    isUndefinedObjectOrValue () {
      return !this.isArray && this.pathValues === undefined
    },
    hasAdditionalProps () {
      return this.layout.additionalProps
    }
  }
}
</script>
