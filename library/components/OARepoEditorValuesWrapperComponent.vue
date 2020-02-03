<template lang="pug">
component(:is="component")
  slot
  div(v-if='isArray')
    oarepo-editor-wrapper(v-bind="addArrayProps" patch-operation="add" v-if="editing" ref="edit" @stop-editing="stopEditing" :submit="submit" :cancel="cancel")
    q-btn(icon="playlist_add" flat color="primary" @click="startEditing" v-if="!editing")
  div(v-if="isUndefinedObjectOrValue")
    oarepo-editor-wrapper(v-bind="addObjectProps" patch-operation="add" ref="edit" @stop-editing="stopEditing" :submit="submit" :cancel="cancel")
</template>
<script>

import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent'
import { SKIP_WRAPPER } from '@oarepo/data-renderer'

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
    cancel: Function
  },
  components: {
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
    addArrayProps () {
      return {
        ...this.$props,
        context: this.currentValue,
        layout: { ...this.layout, path: '-' },
        parentJSONPointer: this.currentJSONPointer,
        pathValues: [],
        value: undefined,
        values: []
      }
    },
    addObjectProps () {
      return {
        ...this.$props,
        context: this.context,
        value: undefined,
        values: []
      }
    },
    isUndefinedObjectOrValue () {
      return !this.isArray && this.pathValues === undefined
    },
    currentJSONPointer () {
      return `${this.parentJSONPointer}/${this.layout.path}`
    },
    currentValue () {
      console.log(this.context[this.layout.path])
      return this.context[this.layout.path]
    },
    defaultValue () {
      const dv = this.layout.defaultValue
      // console.log('dv', dv)
      // console.log('this', this)
      if (dv === null || dv === undefined) {
        return dv
      }
      if (dv instanceof Function) {
        return dv(this.$props)
      } else {
        return dv
      }
    }
  },
  data: function () {
    return {
      editing: false
    }
  },
  methods: {
    async startEditing () {
      const dv = await this.defaultValue
      console.log(dv)
      if (dv) {
        this.addDefaultValue(dv)
      } else {
        this.editing = true
        this.$nextTick(() => {
          this.$refs.edit.startEditing()
        })
      }
    },
    stopEditing () {
      this.editing = false
    },
    addDefaultValue (dv) {
      const submitData = {
        path: `${this.currentJsonPointer}/-`,
        value: dv,
        op: 'add',
        context: this.currentValue,
        prop: '-',
        pathValues: [],
        values: [dv]
      }
      console.log('submit', submitData)
      this.submit(submitData)
    }
  }
}
</script>
