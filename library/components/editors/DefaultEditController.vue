<template lang="pug">
div.row(v-if="!editing")
    component(v-bind="$props" :is="view")
    q-btn(icon="edit" color="primary" size="x-small" dense flat @click="startEditing")
div.row(v-else)
  component(v-bind="$props" :is="edit" @done="stopEditing")
</template>

<script>
export default {
  name: 'default-edit-controller',
  props: {
    rendererComponents: Object,
    extraProps: Object,
    prop: [String, Number],
    context: [Object, Array],
    patchOperation: {
      type: String,
      default: 'replace'
    },
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
    }
  },
  methods: {
    stopEditing () {
      if (this.editing) {
        this.editing = false
      }
      this.$emit('stop-editing')
    },
    startEditing () {
      this.editing = true
    }
  }
}
</script>

<style scoped>

</style>
