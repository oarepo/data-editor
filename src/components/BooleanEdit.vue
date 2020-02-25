<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'boolean-edit',
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
      layout: [
        { 'path': 'a', 'label': 'a' },
        { 'path': 'b', 'label': 'b' },
        { 'path': 'c', 'label': 'c' },
        { 'path': 'd', 'label': 'd' },
        { 'path': 'e', 'label': 'e', array: true, dynamic: true },
        { 'path': 'f', 'label': 'f' },
        { 'path': 'g', 'label': 'g' }
      ]
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
