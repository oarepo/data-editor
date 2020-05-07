<template lang="pug">
component(v-bind="$props" :is="view" v-if="!editing" v-on:dblclick.native="startEditing")
  template(v-slot:after)
    q-btn.iqde-edit-button(icon="edit" color="primary" size="x-small" dense flat @click="startEditing" @mouseenter="hover=true" @mouseleave="hover=false" :class="{'iqde-selected': !hover}")
    q-btn.iqde-edit-button(icon="remove" color="primary" size="x-small" dense flat @click="removeDialog" v-if="isArrayItem" @mouseenter="hover=true" @mouseleave="hover=false" :class="{'iqde-selected': !hover}")
div(v-else)
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
      hover: false
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
