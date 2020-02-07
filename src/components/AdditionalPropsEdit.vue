<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import DialogWithPropertyComponent from './DialogWithPropertyComponent'
import Vue from 'vue'

export default {
  name: 'additional-props-edit',
  data: function () {
    return {
      record: {
        a: { a: 1 },
        b: { b: 2 },
        c: { c: 3 },
        d: {},
        e: {}
      },
      layout: [
        { 'path': 'a', 'label': 'a', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'b', 'label': 'b', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'c', 'label': 'c', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'd', 'label': 'd', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'e', 'label': 'e', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } }],
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
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
