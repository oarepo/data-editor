<template lang="pug">
q-dialog(ref="dialog" @hide="onDialogHide")
  q-card
    q-card-section
      q-form(ref="form")
        q-input(label="Property" v-model="prop" autofocus)
        q-input(label="Value" v-model="value")
      div.text-warning(v-if="errorMessage") {{errorMessage}}
    q-card-actions(align="right")
      q-btn(color="primary" type="submit" label="OK" @click="onOKClick")
      q-btn(color="primary" label="Cancel" @click="onCancelClick")
</template>

<script>
export default {
  name: 'dialog-with-property-component',
  data: function () {
    return {
      value: null,
      prop: null
    }
  },
  props: {
    errorMessage: String
  },
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
      if (await this.$refs.form.validate()) {
        this.$emit('ok', { [this.prop]: this.value })
        this.hide()
      }
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>

<style scoped>
</style>
