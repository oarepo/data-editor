<template lang="pug">
div
  data-renderer-object-component(:value="value" :layout="layout" :paths="paths" :schema="schema" :renderer-components="rendererComponents" :extraProps="extraProps")
  div
    q-btn(icon="playlist_add" flat color="primary" @click="startEditing" v-if="hasDefaultValue")
    q-btn(icon="playlist_add" flat color="primary" @click="openDialog()" v-if="hasDialog")
</template>

<script>
import EditorMixin from './EditorMixin'
import { RendererMixin, ObjectComponent } from '@oarepo/data-renderer'
// import { AdditionMixin } from '../../index'

export default {
  name: 'data-editor-object-component',
  mixins: [RendererMixin, EditorMixin],
  components: {
    'data-renderer-object-component': ObjectComponent
  },
  props: {
    options: Object,
    value: Object,
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
  computed: {
    hasAdditionalProps () {
      return !!this.layout.additionalProps
    }
    // currentDialogComponent () {
    //   console.log(this.dialogComponent)
    //   return this.layout.dialogComponent || this.extraProps.dialogComponent
    // },
    // hasDialog () {
    //   return !!this.currentDialogComponent
    // }
  },
  methods: {
    submitData (value) {
      const submittedData = {
        op: 'add'
        // pathValues: [],
        // values: [value.value],
      }
      console.log('fdsfds', this.hasAdditionalProps, this.layout)
      if (this.hasAdditionalProps) {
        console.log('fdsfds', this.hasAdditionalProps, this.layout, value, this.currentValue, this.context, this.prop, this.context[this.prop])
        submittedData.context = this.currentValue
        submittedData.value = value.value
        submittedData.prop = value.prop
      } else {
        submittedData.context = this.context
        submittedData.value = value
        submittedData.prop = this.prop
      }
      this.editing = false
      this.$emit('stop-editing')
      this.extraProps.submit(submittedData)
    },
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
