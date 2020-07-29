<template lang="pug">
div
  component(:is="inputComponent" v-model="editedValue" @ok="save()" @cancel="cancel()")
</template>

<script>
import EditorMixin from './EditorMixin'

export default {
  name: 'default-submitter',
  mixins: [EditorMixin],
  props: {
    options: Object,
    value: [String, Number, Boolean, undefined],
    paths: Array,
    schema: {
      type: String,
      default: 'inline'
    },
    layout: Object,
    pathLayouts: Object,
    view: Object,
    edit: Object
  },
  computed: {
    inputComponent () {
      return this.layout.valueWrapper.editor
    }
  }
}
</script>

<style scoped>

</style>
