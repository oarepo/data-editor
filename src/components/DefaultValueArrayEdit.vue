<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'DefaultValueArrayEdit',
  data: function () {
    return {
      record: {
        defaultValueArray: [1, 2]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        pathLayouts: {
          defaultValueArray: {
            defaultValue: () => 8
          }
        }
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      console.log('saving', context, prop, value, path, pathValues)
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        }
        console.log(context, prop, value)
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
