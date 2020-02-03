<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'DefaultValueComplexArrayEdit',
  data: function () {
    return {
      record: {
        complexArray: [{ a: 1 }, { b: 2 }, { c: 3 }]
      },
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        pathLayouts: {
          complexArray: {
            defaultValue: () => ({ a: '1' })
          }
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
