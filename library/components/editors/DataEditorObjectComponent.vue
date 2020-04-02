<template lang="pug">
component(:is="rootComponent")
  data-renderer-object-component(:value="value" :layout="layout" :paths="paths" :schema="schema" :path-layouts="pathLayouts" :renderer-components="rendererComponents" :extraProps="extraProps")
  div
    q-btn(icon="playlist_add" dense flat color="primary" @click="beforeStart()" v-if="hasDefaultValue")
    q-btn(icon="playlist_add" dense flat color="primary" @click="openDialog()" v-if="hasDialog")
    q-btn(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="onRemove")
</template>

<script>
import EditorMixin from './EditorMixin'
import AdditionMixin from '../AdditionMixin'
import { ObjectComponent } from '@oarepo/data-renderer'

export default {
  name: 'data-editor-object-component',
  mixins: [EditorMixin, AdditionMixin],
  components: {
    'data-renderer-object-component': ObjectComponent
  },
  props: {
    options: Object,
    value: Object,
    paths: Array,
    schema: {
      type: String,
      default: 'inline'
    },
    layout: Object,
    pathLayouts: Object,
    rendererComponents: Object
  },
  data: function () {
    return {
      editing: false,
      editedValue: null
    }
  },
  computed: {
    hasAdditionalProps () {
      return !!this.layout.additionalProps
    }
  },
  methods: {
    startEditing () {
      this.editing = true
    },
    submitData (value) {
      const submittedData = {
        op: 'add'
        // pathValues: [],
        // values: [value.value],
      }
      if (this.currentValue === undefined) {
        submittedData.context = this.context
        submittedData.value = {}
        submittedData.prop = this.prop
        this.extraProps.submit(submittedData)
      }
      if (value.prop) {
        submittedData.context = this.currentValue
        submittedData.value = value.value
        submittedData.prop = value.prop
      } else {
        submittedData.context = this.context
        submittedData.value = value
        submittedData.prop = this.prop
      }
      this.editing = false
      this.$emit('stop-editing')
      this.extraProps.submit(submittedData)
    },
    valueInput (value) {
      this.editedValue = value
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
