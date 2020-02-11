<template lang="pug">
q-dialog(ref="dialog" @hide="onDialogHide")
  q-card
    q-card-section
      q-form(ref="form")
        q-input(label="Property" v-model="prop")
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
    initialValue: Object,
    errorMessage: String
  },
  mounted () {
    if (this.initialValue) {
      this.prop = this.initialValue.prop
      this.value = this.initialValue.value
    }
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
        this.$emit('ok', { prop: this.prop, value: this.value })
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
