<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>

import Vue from 'vue'

export default {
  name: 'default-value-complex-array-edit',
  data: function () {
    return {
      record: {
        contact: [{ email: 1 }, { phone: '+420123123123' }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        children: [{
          prop: 'contact',
          additionalProps: { defaultValue: () => ({ phone: '+420123123124' }) }
        }]
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
