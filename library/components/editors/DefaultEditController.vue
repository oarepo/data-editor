<template lang="pug">
div.row(v-if="!editing")
    component(:value="localValue" :extraProps="extraProps" :prop="prop" :layout="layout" :pathLayouts="pathLayouts" :level="level" :paths="paths" :is="view")
    q-btn(icon="edit" color="primary" size="x-small" dense flat @click="startEditing")
    q-btn(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="remove")
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
      editing: false,
      localValue: this.value
    }
  },
  computed: {
    view () {
      return this.layout.valueWrapper.view
    },
    edit () {
      return this.layout.valueWrapper.submitter
    }
  },
  methods: {
    stopEditing () {
      if (this.editing) {
        this.updateLocalValue()
        this.editing = false
      }
      this.$emit('stop-editing')
    },
    startEditing () {
      this.editing = true
    },
    updateLocalValue () {
      this.localValue = this.context[this.prop]
    }
  }
}
</script>

<style scoped>

</style>
