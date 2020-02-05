<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :dialog-component="dialogComponent")
</template>

<script>
import DialogComponent from './DialogComponent'

export default {
  name: 'complex-array-dialog-edit',
  data: function () {
    return {
      record: {
        complexArray: [{ a: 1 }, { a: 2 }, { a: 3 }]
      },
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      dialogComponent: DialogComponent
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          context[prop] = value
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>

</style>
