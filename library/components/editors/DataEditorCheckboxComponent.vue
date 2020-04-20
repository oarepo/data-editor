<template lang="pug">
q-checkbox(:value="value" @input="valueInput")
</template>

<script>
export default {
  name: 'data-editor-input-component',
  props: {
    value: Boolean
  },
  methods: {
    valueInput (value) {
      this.$emit('input', value)
      this.$emit('ok')
    }
  }
}
</script>

<style scoped>

</style>
