<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DataEditorComponent from '../../library/components/DataEditorComponent'

export default {
  name: 'object-with-no-values-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
      },
      layout: {
        showEmpty: true,
        children: [
          { prop: 'a' },
          { prop: 'b' }
        ]
      }
      // layout: [{ 'path': 'a', 'label': 'a' }, { 'path': 'b', 'label': 'b' }]
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      console.log(context, prop, value, op, context[prop])
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (context[prop] === undefined) {
        console.log('ttt')
        Vue.set(context, prop, value)
      } else {
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
