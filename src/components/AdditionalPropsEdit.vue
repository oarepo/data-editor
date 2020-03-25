<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import DialogWithPropertyComponent from './DialogWithPropertyComponent'
import Vue from 'vue'
import DataEditorComponent from '../../library/components/DataEditorComponent'

function defaultValue ({ context, layout }) {
  for (const prop of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    if (context[layout.prop][prop] === undefined) {
      return { prop: prop, value: 1 }
    }
  }
}

export default {
  name: 'additional-props-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {
        a: { a: 1 },
        b: { b: 2 },
        c: { c: 3 },
        d: {},
        e: {}
      },
      layout: {
        children: [
          { prop: 'a', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'b', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'c', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'd', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'e', additionalProps: { defaultValue: defaultValue } }]
      },
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
