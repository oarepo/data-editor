<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'simple-default-value-edit',
  data: function () {
    return {
      record: {
        simpleObject: {
          firstname: 'a',
          lastname: 'b'
        }
      },
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        pathLayouts: {
          simpleObject: {
            defaultValue: () => ({ a: '1' })
          }
        }
      }
    }
  },
  methods: {
    submit ({ context, op, prop, value }) {
      console.log('saving', context, prop, value)
      if (op === 'add') {
        context[prop] = value
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        delete context[prop]
      }
    },
    cancel (props) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>

</style>
