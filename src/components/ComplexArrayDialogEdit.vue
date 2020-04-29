<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DialogComponent from './DialogComponent'

export default {
  name: 'complex-array-dialog-edit',
  data: function () {
    return {
      record: {
        contact: [{ phone: '+420123123124' }, { email: 'mary.black@gmail.com' }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel,
          dialogComponent: DialogComponent
        }
      },
      layout: {
        children: [
          {
            prop: 'contact'
          }
        ]
      }
    }
  },
  methods: {
    submit ({ paths, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        if (Array.isArray(context)) {
          context.splice(prop, 1, value)
        } else {
          Vue.set(context, prop, value)
        }
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
