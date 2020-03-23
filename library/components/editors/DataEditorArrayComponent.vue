<template lang="pug">
div
  div.row(v-if="!editing")
    data-renderer-object-component(:value="value" :layout="layout" :paths="paths" :schema="schema")
    q-btn(icon="edit" color="primary" size="x-small" dense flat @click="startEditing")
  div.row(v-else)
    q-input(@input="valueInput" ref="editor")
    div.q-mt-sm
      q-btn(icon="done" color="primary" @click="save" outline) Uložit
      q-btn.q-ml-sm(icon="clear" color="grey" @click="onCancel" outline) Storno
</template>

<script>
import EditorMixin from './EditorMixin'
import { RendererMixin, ArrayComponent } from '@oarepo/data-renderer'

export default {
  name: 'data-editor-array-component',
  mixins: [RendererMixin, EditorMixin],
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
