<template lang="pug">
q-dialog(ref="dialog" @hide="onDialogHide")
  q-card
    q-card-section
      q-item Chcete smazat tento záznam?
    q-card-actions(align="right")
      q-btn(color="primary" type="submit" label="OK" @click="onOKClick")
      q-btn(color="primary" label="Cancel" @click="onCancelClick")
</template>

<script>
export default {
  name: 'delete-dialog',
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    async onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>

<style scoped>
</style>
