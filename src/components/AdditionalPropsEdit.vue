<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import DialogWithPropertyComponent from './DialogWithPropertyComponent'
import Vue from 'vue'

function defaultValue ({ context, layout }) {
  for (const prop of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    if (context[layout.prop][prop] === undefined) {
      return { prop: prop, value: 'keyword' }
    }
  }
}

export default {
  name: 'additional-props-edit',
  data: function () {
    return {
      record: {
        creator: { name: 'Mary Black' },
        contact: { phone: '+420123123124' },
        keywords: {}
      },
      layout: {
        children: [
          { prop: 'creator', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'contact', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'keywords', additionalProps: { defaultValue: defaultValue } }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
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
