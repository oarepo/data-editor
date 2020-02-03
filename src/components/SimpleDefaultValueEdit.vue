<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'SimpleDefaultValueEdit',
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
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true,
        pathLayouts: {
          simpleObject: {
            // children: ['firstname', 'lastname'],
            defaultValue: () => ({ a: '1' })
          }
        }
      }
    }
  },
  methods: {
    submit ({ context, op, prop, value }) {
      console.log('saving', context, prop, value)
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
