<template lang="pug">
div
  data-renderer-array-component(:value="value" :layout="layout" :paths="paths" :schema="schema" :renderer-components="rendererComponents" :extraProps="extraProps")
  div
    q-btn(icon="playlist_add" flat color="primary" @click="beforeStart()" v-if="hasDefaultValue")
    q-btn(icon="playlist_add" flat color="primary" @click="openDialog()" v-if="hasDialog")
</template>

<script>
import EditorMixin from './EditorMixin'
import { RendererMixin, ArrayComponent } from '@oarepo/data-renderer'
import { AdditionMixin } from '../../index'

export default {
  name: 'data-editor-array-component',
  mixins: [RendererMixin, EditorMixin, AdditionMixin],
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
      editedValue: null
    }
  },
  methods: {
    valueInput (value) {
      this.editedValue = value
      console.log(value, this.editedValue)
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
