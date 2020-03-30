<template lang="pug">
component(:is="rootComponent")
  div.row(v-if="!editing")
    component(v-bind="$props" v-bind:layout="currentLayout" :is="view")
    q-btn(icon="edit" color="primary" size="x-small" dense flat @click="startEditing")
    q-btn(icon="remove" color="primary" size="x-small" dense flat v-if="isArrayItem" @click="onRemove")
  div.row(v-else)
    component(v-bind="$props" :is="edit")
</template>

<script>
import EditorMixin from './EditorMixin'

export default {
  name: 'data-editor-generic-component',
  mixins: [EditorMixin],
  props: {
    options: Object,
    value: [String, Number, Boolean, undefined],
    paths: Array,
    schema: {
      type: String,
      default: 'inline'
    },
    layout: Object,
    pathLayouts: Object,
    view: Object,
    edit: Object
  },
  computed: {
    currentLayout () {
      let layout = this.layout
      layout.value.element = 'div'
      return layout
    }
  }
}
</script>

<style scoped>

</style>
