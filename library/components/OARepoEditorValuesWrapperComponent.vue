<template lang="pug">
component(:is="component")
  slot
  div(v-if='isArray')
    oarepo-editor-wrapper(v-bind="addArrayProps" patch-operation="add" v-if="editing" ref="edit" @stop-editing="stopEditing" :submit="submit" :cancel="cancel" :dialog-component="dialogComponent")
    q-btn(icon="playlist_add" flat color="primary" @click="startEditing" v-if="!editing && !hasDialog")
    q-btn(icon="playlist_add" flat color="primary" @click="openDialog" v-if="hasDialog")
  div(v-if="isUndefinedObjectOrValue")
    oarepo-editor-wrapper(v-bind="addObjectProps" patch-operation="add" ref="edit" @stop-editing="stopEditing" :submit="submit" :cancel="cancel" :dialog-component="dialogComponent")
</template>
<script>

import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent.vue'
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
    cancel: Function,
    dialogComponent: Object
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
    hasDialog () {
      return this.layout.dialogComponent || this.dialogComponent
    },
    isUndefinedObjectOrValue () {
      return !this.isArray && this.pathValues === undefined
    },
    currentJSONPointer () {
      return `${this.parentJSONPointer}/${this.layout.path}`
    },
    currentValue () {
      return this.context[this.layout.path]
    },
    defaultValue () {
      const dv = this.layout.defaultValue
      // console.log('dv', dv)
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
      console.log(this)
      // let dv = await this.defaultValue
      const dv = await this.defaultValue
      console.log(dv)
      // if (!this.parentJSONPointer) {
      //   console.log('if', dv)
      //   dv = dv.rootDefault
      // } else {
      //   console.log('else', dv)
      //   dv = dv.childDefault
      // }
      // console.log(dv)
      if (dv) {
        this.addDefaultValue(dv)
      } else {
        this.editing = true
        this.$nextTick(() => {
          this.$refs.edit.startEditing()
        })
      }
    },
    openDialog () {
      // console.log('v', this.value, 'p', this.prop, 'cV', this.currentValue[0], 'dV', this.defaultValue)
      // console.log(Object.getOwnPropertyNames(this.currentValue[0])[0])
      this.$q.dialog({
        component: this.layout.dialogComponent || this.dialogComponent,
        parent: this
      }).onOk((value) => {
        this.editing = false
        this.$emit('stop-editing')
        this.addDefaultValue({ key: Object.getOwnPropertyNames(this.currentValue[0])[0], value: value })
        // this.addDefaultValue({ key: 'a', value: value })
        // this.addDefaultValue(value)
      })
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
