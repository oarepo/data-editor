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
    pathLayouts: Object
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
      return this.editorComponents || this.$oarepo.dataEditor.editorComponents
    }
  }
}
</script>
