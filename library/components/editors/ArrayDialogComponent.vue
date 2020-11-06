<template lang="pug">
q-dialog(ref="dialog" @hide="onDialogHide")
  q-card
    q-card-section
      q-form(ref="form")
        q-select("Type" :options="valueTypes" v-model="valueType")
        q-input(v-if="valueType==='simple'" label="Value" v-model="value")
      div.text-warning(v-if="errorMessage") {{errorMessage}}
    q-card-actions(align="right")
      q-btn(color="primary" type="submit" label="OK" @click="onOKClick")
      q-btn(color="primary" label="Cancel" @click="onCancelClick")
</template>

<script>
export default {
  name: 'array-dialog-component',
  data: function () {
    return {
      valueTypes: ['simple', 'object', 'array'],
      valueType: 'simple',
      value: null
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
        if (this.valueType === 'object') {
          this.$emit('ok', {})
        } else if (this.valueType === 'array') {
          this.$emit('ok', [])
        } else {
          this.$emit('ok', this.value)
        }
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
