<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :dialog-component="dialogComponent")
</template>

<script>
import DialogComponent from './DialogComponent'

export default {
  name: 'object-dialog-edit',
  data: function () {
    return {
      record: {
        a: 1,
        b: 2,
        c: 3
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
      },
      dialogComponent: DialogComponent
    }
  },
  methods: {
    openDialog () {
      this.$q.dialog({
        component: DialogComponent,
        parent: this
      }).onOk((value) => {
        console.log('ok', value)
      })
    },
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
