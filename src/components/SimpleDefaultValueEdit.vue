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
      if (op === 'add') {
        this.$set(context, prop, value)
      }
      if (op === 'replace') {
        // this.$set(context, prop, value)
        context[prop] = value
      }
      if (op === 'remove') {
        this.$delete(context, prop)
        // delete context[prop]
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
