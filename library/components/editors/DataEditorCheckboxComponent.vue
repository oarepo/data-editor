<template lang="pug">
div
  q-checkbox(:val="editedValue" :value="value" @input="valueInput")
</template>

<script>
import EditorMixin from './EditorMixin'

export default {
  name: 'data-editor-input-component',
  props: {
    extraProps: Object,
    prop: [String, Number]
  },
  mixins: [EditorMixin],
  data: function () {
    return {
      editedValue: false
    }
  },
  methods: {
    valueInput () {
      this.editedValue = !this.value
      this.save()
    }
  }
}
</script>

<style scoped>

</style>
