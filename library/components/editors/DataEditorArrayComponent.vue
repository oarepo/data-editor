<template lang="pug">
component.array-editor-wrapper(:is="rootComponent")
  template(v-if="hasValue")
    data-renderer-array-component(:value="value" :prop="prop" :layout="layout" :paths="paths" :schema="schema" :path-layouts="pathLayouts" :renderer-components="rendererComponents" :extraProps="extraProps" :level="level")
    q-btn.object-editor-button(icon="playlist_add" dense flat color="primary" @click="openDialog(layout)" v-if="hasDialog")
    q-btn.object-editor-button(icon="playlist_add" dense flat color="primary" @click="addDefaultValue()" v-if="!hasDialog")
    q-btn.object-editor-button(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="removeDialog")
  template(v-else)
    q-btn(icon="playlist_add" dense flat color="primary" @click="createComplexValue()") Vytvořit
</template>

<script>
import EditorMixin from './EditorMixin'
import AdditionMixin from './AdditionMixin'
import { ArrayComponent } from '@oarepo/data-renderer'
import DeletionMixin from './DeletionMixin'

export default {
  name: 'data-editor-array-component',
  mixins: [EditorMixin, AdditionMixin, DeletionMixin],
  components: {
    'data-renderer-array-component': ArrayComponent
  },
  props: {
    options: Object,
    value: Array,
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
      addedValue: null
    }
  },
  methods: {
    submitData (value) {
      const submittedData = {
        op: 'add',
        context: this.currentValue,
        value: value,
        paths: this.paths
      }
      this.extraProps.submit(submittedData)
      this.$emit('done')
    }
  }
}
</script>
