<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DataEditorComponent from '../../library/components/DataEditorComponent'
// import DialogComponent from './DialogComponent'

export default {
  name: 'non-existing-complex-array-dialog-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {}
      // layout: [{ 'path': 'a', 'label': 'a', dialogComponent: DialogComponent, array: true, dynamic: true }]
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context[prop])) {
          context[prop].push(value)
        } else {
          Vue.set(context, prop, value)
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
