<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'TreeEdit',
  data: function () {
    return {
      record: {
        tree: [1, 2, 3, [4, 5, 6, [7, 8, 9, [10]]]]
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
      console.log('submitting', context, prop, value, path, pathValues)
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        }
        console.log(context, prop, value)
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
