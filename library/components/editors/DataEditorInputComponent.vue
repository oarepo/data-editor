<template lang="pug">
div
  q-input(:value="value" @input="valueInput" ref="editor" autofocus)
  div.q-mt-sm
    q-btn(icon="done" color="primary" @click="ok" outline) Uložit
    q-btn.q-ml-sm(icon="clear" color="grey" @click="cancel" outline) Storno
</template>

<script>
export default {
  name: 'data-editor-input-component',
  props: {
    value: [String, Number, undefined]
  },
  methods: {
    valueInput (value) {
      this.$emit('input', value)
    },
    ok () {
      this.$emit('ok')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>
