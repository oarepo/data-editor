<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'non-existing-default-value-array-edit',
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        showEmpty: true,
        children: [
          {
            prop: 'keywords',
            additionalProps: { defaultValue: () => 'keyword' },
            item: {}
          }
        ]
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
