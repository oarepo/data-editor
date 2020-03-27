<template lang="pug">
div
  data-editor-generic-component(v-bind="$props" :view="view" :edit="edit")
</template>

<script>
import EditorMixin from './EditorMixin'
import { RendererMixin } from '@oarepo/data-renderer'
import DataEditorGenericComponent from './DataEditorGenericComponent'

export default {
  name: 'data-editor-undefined-component',
  mixins: [RendererMixin, EditorMixin],
  components: {
    DataEditorGenericComponent
  },
  props: {
    options: Object,
    value: Number,
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
      view: this.$oarepo.dataRenderer.rendererComponents.undefined,
      edit: this.$oarepo.dataEditor.editorInputComponents.undefined
    }
  }
}
</script>

<style scoped>

</style>
