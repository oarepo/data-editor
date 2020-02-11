<template lang="pug">
div
  oarepo-editor-wrapper(v-bind="addArrayProps" patch-operation="add" v-if="editing" ref="edit" @stop-editing="stopEditing"
    :submit="submit" :cancel="cancel" :dialog-component="dialogComponent")
  q-btn(icon="playlist_add" flat color="primary" @click="startEditing" v-if="!editing && !hasDialog")
  q-btn(icon="playlist_add" flat color="primary" @click="openDialog()" v-if="hasDialog")
</template>
<script>

import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent.vue'
import AdditionMixin from './AdditionMixin'

export default {
  mixins: [AdditionMixin],
  components: {
    'oarepo-editor-wrapper': OARepoEditorWrapperComponent
  },
  name: 'add-array-item-component',
  computed: {
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
    }
  },
  methods: {
    submitData (value) {
      const submittedData = {
        op: 'add',
        pathValues: [],
        values: [value]
      }
      if (this.currentValue === undefined) {
        submittedData.value = [value]
        submittedData.context = this.context
        submittedData.path = this.currentJSONPointer
        submittedData.prop = this.layout.path
      } else {
        submittedData.context = this.currentValue
        submittedData.value = value
        submittedData.path = `${this.currentJSONPointer}/-`
        submittedData.prop = '-'
      }
      console.log('submit', submittedData)
      this.editing = false
      this.$emit('stop-editing')
      this.submit(submittedData)
    }
  }
}
</script>
