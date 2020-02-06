<template lang="pug">
component(:is="component")
  div
    oarepo-editor-wrapper(v-bind="addArrayProps" patch-operation="add" v-if="editing" ref="edit" @stop-editing="stopEditing"
      :submit="submit" :cancel="cancel" :dialog-component="dialogComponent")
    q-btn(icon="playlist_add" flat color="primary" @click="startEditing" v-if="!editing && !hasDialog")
    q-btn(icon="playlist_add" flat color="primary" @click="openDialog" v-if="hasDialog")
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
    // 'add-array-item-component': AddArrayItemComponent,
    'oarepo-editor-wrapper': OARepoEditorWrapperComponent
  },
  name: 'add-array-item-component',
  computed: {
    component () {
      console.log(this)
      const ret = this.layout['value-wrapper-viewer']['component'] || this.layout['value-wrapper-viewer']['element']
      return ret !== SKIP_WRAPPER ? ret : 'div'
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
    hasDialog () {
      return !!this.currentDialogComponent
    },
    currentJSONPointer () {
      return `${this.parentJSONPointer}/${this.layout.path}`
    },
    currentValue () {
      return this.context[this.layout.path]
    },
    defaultValue () {
      const dv = this.layout.defaultValue
      if (dv === null || dv === undefined) {
        return dv
      }
      if (dv instanceof Function) {
        return dv(this.$props)
      } else {
        return dv
      }
    },
    currentDialogComponent () {
      console.log(this)
      return this.layout.dialogComponent || this.dialogComponent
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
    openDialog () {
      this.$q.dialog({
        component: this.layout.dialogComponent || this.dialogComponent,
        parent: this
      }).onOk((value) => {
        const submitData = {
          op: 'add',
          pathValues: [],
          values: [value]
        }
        if (this.currentValue === undefined) {
          submitData.value = [value]
          submitData.context = this.context
          submitData.path = this.currentJSONPointer
          submitData.prop = this.layout.path
        } else {
          submitData.context = this.currentValue
          submitData.value = value
          submitData.path = `${this.currentJSONPointer}/-`
          submitData.prop = '-'
        }
        console.log('submit', submitData)
        this.editing = false
        this.$emit('stop-editing')
        this.submit(submitData)
      })
    },
    stopEditing () {
      this.editing = false
    },
    addDefaultValue (dv) {
      const submitData = {
        op: 'add',
        pathValues: [],
        values: [dv]
      }
      if (this.currentValue === undefined) {
        submitData.context = this.context
        submitData.value = [dv]
        submitData.path = this.currentJSONPointer
        submitData.prop = this.layout.path
      } else {
        submitData.context = this.currentValue
        submitData.value = dv
        submitData.path = `${this.currentJSONPointer}/-`
        submitData.prop = '-'
      }
      console.log('submit', submitData)
      this.submit(submitData)
    }
  }
}
</script>
