<template lang="pug">
div
  q-input(v-model="editedValue" @input="valueInput" ref="editor" autofocus)
  div.q-mt-sm
    q-btn(icon="done" color="primary" @click="save" outline) Uložit
    q-btn.q-ml-sm(icon="clear" color="grey" @click="onCancel" outline) Storno
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
      editedValue: null
    }
  },
  mounted () {
    this.editedValue = this.value
  },
  methods: {
    valueInput (value) {
      this.editedValue = value
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
