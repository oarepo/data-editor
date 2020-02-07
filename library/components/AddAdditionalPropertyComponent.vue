<template lang="pug">
div
  oarepo-editor-wrapper(v-bind="addObjectProps" patch-operation="add" ref="edit" @stop-editing="stopEditing"
    v-if="!hasDialog && !hasDefaultValue" :submit="submit" :cancel="cancel" :dialog-component="dialogComponent")
  q-btn(icon="playlist_add" flat color="primary" @click="startEditing" v-if="hasDefaultValue")
  q-btn(icon="playlist_add" flat color="primary" @click="openDialog()" v-if="hasDialog")
</template>
<script>

import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent.vue'
import AdditionMixin from './AdditionMixin'
// import Vue from 'vue'

export default {
  mixins: [AdditionMixin],
  components: {
    'oarepo-editor-wrapper': OARepoEditorWrapperComponent
  },
  name: 'add-additional-property-component',
  computed: {
    currentDialogComponent () {
      return this.layout.additionalProps.dialogComponent
    },
    defaultValue () {
      const dv = this.layout.additionalProps.defaultValue
      if (dv === null || dv === undefined) {
        return dv
      }
      if (dv instanceof Function) {
        return dv(this.$props)
      } else {
        return dv
      }
    },
    addObjectProps () {
      return {
        ...this.$props,
        context: this.context,
        value: undefined,
        values: []
      }
    }
  },
  methods: {
    submitData (value) {
      const submittedData = {
        op: 'add',
        pathValues: [],
        values: [value.value],
        context: this.currentValue,
        value: value.value,
        path: `${this.currentJSONPointer}/${value.prop}`,
        prop: value.prop
      }
      console.log('submit', submittedData)
      this.editing = false
      this.$emit('stop-editing')
      this.submit(submittedData)
    },
    validate (value) {
      throw new Error('validation not succesful')
    }
  }
}
</script>
