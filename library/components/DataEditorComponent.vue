<template lang="pug">
div
  data-renderer.col(:data="record" :layout="layout" :schema="options.schema" :path-layouts="pathLayouts" :renderer-components="currentEditorComponents" v-bind="currentOptions")
</template>

<style>
</style>

<script>

export default {
  props: {
    layout: Object,
    record: Object,
    options: Object,
    pathLayouts: Object,
    editorComponents: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'data-editor-component',
  computed: {
    currentOptions () {
      const opts = {
        ...this.options
      }
      if (opts.extraProps === undefined) {
        opts.extraProps = {}
      }
      return opts
    },
    currentEditorComponents () {
      const editorComponents = {}
      Object.keys(this.$oarepo.dataEditor.editorComponents).forEach(type => {
        editorComponents[type] = this.editorComponents[type] || this.$oarepo.dataEditor.editorComponents[type]
      })
      return editorComponents
    }
  }
}
</script>
