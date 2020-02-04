<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
export default {
  name: 'additional-props-edit',
  data: function () {
    return {
      record: {
        a: 1,
        b: 2,
        c: 3
      },
      layout: [{ 'path': 'a' }, { 'path': 'b' }, { 'path': 'c' }, { 'path': 'd' }, { 'path': 'e' }],
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
