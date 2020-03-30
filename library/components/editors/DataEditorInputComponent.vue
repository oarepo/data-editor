<template lang="pug">
div
  q-input(v-model="editedValue" @input="valueInput" ref="editor")
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
    if (this.$children[0]) {
      if (this.$children[0].focus) {
        this.$children[0].focus()
      }
      if (this.$children[0].select) {
        this.$children[0].select()
      }
    }
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
