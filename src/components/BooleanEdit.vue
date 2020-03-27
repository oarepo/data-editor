<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DataEditorComponent from '../../library/components/DataEditorComponent'

export default {
  name: 'boolean-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {
        a: true,
        b: false,
        e: []
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true,
        pathLayouts: {
          c: {
            defaultValue: () => true
          },
          d: {
            defaultValue: true
          },
          e: {
            defaultValue: () => ({ a: false })
          },
          f: {
            defaultValue: () => false
          },
          g: {
            defaultValue: false
          }
        }
      },
      layout: {}
      // layout: [
      //   { 'path': 'a', 'label': 'a' },
      //   { 'path': 'b', 'label': 'b' },
      //   { 'path': 'c', 'label': 'c' },
      //   { 'path': 'd', 'label': 'd' },
      //   { 'path': 'e', 'label': 'e', array: true, dynamic: true },
      //   { 'path': 'f', 'label': 'f' },
      //   { 'path': 'g', 'label': 'g' }
      // ]
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
    },
    cancel (props) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>

</style>
