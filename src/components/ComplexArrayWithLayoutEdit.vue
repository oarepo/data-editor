<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
export default {
  name: 'complex-array-with-layout-edit',
  data: function () {
    return {
      record: {
        complexArray: [
          { a: 1 },
          { a: 2 },
          { a: 3 },
          { a: 4 }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
      },
      layout: [{
        path: 'complexArray',
        label: 'ComplexArray',
        array: true,
        dynamic: true,
        children: [{ path: 'a', label: 'A' }]
      }]
      // layout: [{
      //   path: 'complexArray',
      //   label: 'ComplexArray',
      //   array: true,
      //   dynamic: true,
      //   children: [{ path: '', children: [{ path: 'a', label: 'A' }] }]
      // }]
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push({ a: value })
        } else {
          context[prop] = { a: value }
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
