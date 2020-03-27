<template lang="pug">
div
  data-editor-generic-component(v-bind="$props" :view="view" :edit="edit")
</template>

<script>
import EditorMixin from './EditorMixin'
import { RendererMixin } from '@oarepo/data-renderer'
import DataEditorGenericComponent from './DataEditorGenericComponent'

export default {
  name: 'data-editor-boolean-component',
  mixins: [RendererMixin, EditorMixin],
  components: {
    DataEditorGenericComponent
  },
  props: {
    options: Object,
    value: Boolean,
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
      view: this.$oarepo.dataRenderer.rendererComponents.boolean,
      edit: this.$oarepo.dataEditor.editorInputComponents.boolean
    }
  }
}
</script>

<style scoped>

</style>
