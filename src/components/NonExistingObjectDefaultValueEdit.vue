<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'non-existing-object-default-value-edit',
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
      layout: [{ 'path': 'a', 'label': 'a', defaultValue: () => ({ a: '1' }), dynamic: true }]
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      console.log('submitting', context, prop, value, path, pathValues)
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
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>

</style>
