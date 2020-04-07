<template lang="pug">
component(:is="rootComponent")
  div(v-if="hasValue")
    data-renderer-object-component(:value="value" :prop="prop" :layout="layout" :paths="paths" :schema="schema" :path-layouts="pathLayouts" :renderer-components="rendererComponents" :extraProps="extraProps" :level="level")
    q-btn(icon="playlist_add" dense flat color="primary" @click="beforeStart()" v-if="hasDefaultValue")
    q-btn(icon="playlist_add" dense flat color="primary" @click="openDialog()" v-if="hasDialog")
    q-btn(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="onRemove")
  div(v-else)
    q-btn(icon="playlist_add" dense flat color="primary" @click="createComplexValue()") Vytvořit
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
      if (value.prop) {
        submittedData.context = this.currentValue
        submittedData.value = value.value
        submittedData.prop = value.prop
      } else {
        const prop = Object.keys(value)
        submittedData.context = this.currentValue
        submittedData.value = value[prop]
        submittedData.prop = prop
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
