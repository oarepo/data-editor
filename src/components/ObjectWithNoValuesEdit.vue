<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
export default {
  name: 'object-with-no-values-edit',
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
      layout: [{ 'path': 'a', 'label': 'a' }, { 'path': 'b', 'label': 'b' }, { 'path': 'c', 'label': 'c' }]
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          context[prop] = value
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
