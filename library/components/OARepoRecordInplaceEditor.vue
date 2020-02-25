<template lang="pug">
div
  data-renderer.col(:data="record" :layout="layout" v-bind="currentOptions")
    slot(v-for="(_, name) in $slots" :name="name" :slot="name")
    template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
      slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

import OARepoRecordMixin from './OARepoRecordMixin'
import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent.vue'
import OARepoEditorValuesWrapperComponent from './OARepoEditorValuesWrapperComponent.vue'

export default {
  name: 'oarepo-record-inplace-editor',
  mixins: [OARepoRecordMixin],
  methods: {
    layoutTranslator (layout, options) {
      if (layout.inplaceEditorTranslated) {
        return layout
      }
      if (options.nextLayoutTranslator) {
        layout = options.nextLayoutTranslator(layout, options)
      }
      layout = { ...layout }
      layout['value-viewer'] = layout.value
      if (layout['value-editor'] === undefined) {
        layout['value-editor'] = {
          component: 'q-input'
        }
      }
      if (layout['boolean-value-editor'] === undefined) {
        layout['boolean-value-editor'] = {
          component: 'q-checkbox'
        }
      }
      layout.value = {
        ...layout['value-viewer'],
        'component': options.editorWrapperComponent || OARepoEditorWrapperComponent,
        ...(layout['editor-wrapper'] || {})
      }
      if (!layout.children || !layout.children.length) {
        layout['value-wrapper-viewer'] = layout['value-wrapper']
        layout['value-wrapper'] = {
          ...(layout['value-wrapper'] || {}),
          'element': options.editorValuesWrapperComponent || OARepoEditorValuesWrapperComponent
        }
      }
      layout.inplaceEditorTranslated = true
      return layout
    }
  },
  computed: {
    currentOptions () {
      const nextLayoutTranslator = this.options.layoutTranslator
      const opts = {
        ...this.options
      }
      if (opts.extraProps === undefined) {
        opts.extraProps = {}
      }
      opts.extraProps.dialogComponent = this.dialogComponent
      opts.layoutTranslator = (layout, options) => this.layoutTranslator(layout, {
        ...options,
        nextLayoutTranslator
      })
      return opts
    }
  }
}
</script>
