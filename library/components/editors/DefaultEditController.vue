<template lang="pug">
div.row(v-if="!editing")
  component.col-auto(v-bind="$props" :is="view")
  q-btn.col-1-sm-1.object-editor-button(icon="edit" color="primary" size="x-small" dense flat @click="startEditing")
  q-btn.col-1-sm-1.object-editor-button(icon="remove" color="primary" size="x-small" dense flat @click="removeDialog" v-if="isArrayItem")
div.row(v-else)
  component(v-bind="$props" :is="edit" @done="stopEditing")
</template>

<script>
import DeletionMixin from './DeletionMixin'

export default {
  name: 'default-edit-controller',
  mixins: [DeletionMixin],
  props: {
    rendererComponents: Object,
    extraProps: Object,
    prop: [String, Number],
    context: [Object, Array],
    level: Number,
    options: Object,
    value: [String, Number, Boolean, undefined],
    paths: Array,
    schema: {
      type: String,
      default: 'inline'
    },
    layout: Object,
    pathLayouts: Object
  },
  data: function () {
    return {
      editing: false
    }
  },
  computed: {
    view () {
      return this.layout.valueWrapper.view
    },
    edit () {
      return this.layout.valueWrapper.submitter
    },
    localValue () {
      return this.context[this.prop]
    }
  },
  methods: {
    stopEditing () {
      console.log('b')
      if (this.editing) {
        this.editing = false
        // this.localValue = this.value
        // this.localValue = this.context[this.prop]
        // this.updateLocalValue()
      }
      // this.$emit('stop-editing')
    },
    startEditing () {
      this.editing = true
    }
  }
}
</script>

<style scoped>

</style>
