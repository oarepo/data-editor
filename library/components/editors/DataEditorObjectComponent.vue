<template lang="pug">
component(:is="rootComponent")
  div(v-if="hasValue").row
    data-renderer-object-component.col-auto(:value="value" :prop="prop" :layout="layout" :paths="paths" :schema="schema" :path-layouts="pathLayouts" :renderer-components="rendererComponents" :extraProps="extraProps" :level="level")
    q-btn.col-1-sm-1.object-editor-button(icon="playlist_add" dense flat color="primary" @click="addDefaultValue()" v-if="hasDefaultValue")
    q-btn.col-1-sm-1.object-editor-button(icon="playlist_add" dense flat color="primary" @click="openDialog(layout)" v-if="hasDialog")
    q-btn.col-1-sm-1.object-editor-button(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="removeDialog")
  div(v-else)
    q-btn(icon="playlist_add" dense flat color="primary" @click="createComplexValue()") Vytvořit
</template>

<script>
import EditorMixin from './EditorMixin'
import AdditionMixin from './AdditionMixin'
import { ObjectComponent } from '@oarepo/data-renderer'
import DeletionMixin from './DeletionMixin'

export default {
  name: 'data-editor-object-component',
  mixins: [EditorMixin, AdditionMixin, DeletionMixin],
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
  computed: {
    hasAdditionalProps () {
      return !!this.layout.additionalProps
    }
  },
  methods: {
    submitData (value) {
      if (value === undefined || value === null) {
        this.$emit('done')
        return
      }
      Object.keys(value).forEach(prop => {
        const submittedData = {
          op: 'add',
          context: this.currentValue,
          value: value[prop],
          prop: prop,
          paths: this.paths
        }
        this.extraProps.submit(submittedData)
      })
      this.$emit('done')
    }
  }
}
</script>

<style scoped>

</style>
