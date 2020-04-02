<template lang="pug">
data-editor-generic-component(v-bind="$props" :view="view" :edit="edit")
</template>

<script>
import EditorMixin from './EditorMixin'
import DataEditorGenericComponent from './DataEditorGenericComponent.vue'

export default {
  name: 'data-editor-string-component',
  mixins: [EditorMixin],
  components: {
    DataEditorGenericComponent
  },
  props: {
    options: Object,
    value: String,
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
      view: this.$oarepo.dataRenderer.rendererComponents.string,
      edit: this.$oarepo.dataEditor.editorInputComponents.string
    }
  }
}
</script>

<style scoped>

</style>
