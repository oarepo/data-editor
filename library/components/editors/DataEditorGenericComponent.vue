<template lang="pug">
div
  div.row(v-if="!editing")
    component(v-bind="$props" :is="view")
    q-btn(icon="edit" color="primary" size="x-small" dense flat @click="startEditing")
    q-btn(icon="remove" color="primary" size="x-small" dense flat v-if="isArrayItem" @click="onRemove")
  div.row(v-else)
    component(v-bind="$props" :is="edit")
</template>

<script>
import { RendererMixin } from '@oarepo/data-renderer'
import EditorMixin from './EditorMixin'

export default {
  name: 'data-editor-generic-component',
  mixins: [RendererMixin, EditorMixin],
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
  }
}
</script>

<style scoped>

</style>
