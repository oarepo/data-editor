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

export default {
  mixins: [AdditionMixin],
  components: {
    'oarepo-editor-wrapper': OARepoEditorWrapperComponent
  },
  name: 'add-object-property-component',
  computed: {
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
        op: 'add'
        // pathValues: [],
        // values: [value]
      }
      if (this.currentValue === undefined) {
        submittedData.context = this.context
        submittedData.value = value
        submittedData.path = this.currentJSONPointer
        submittedData.prop = this.layout.path
      }
      console.log('submit', submittedData)
      this.editing = false
      console.log(this.editing)
      this.$emit('stop-editing')
      this.submit(submittedData)
    }
  }
}
</script>
