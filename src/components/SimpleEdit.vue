<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'simple-edit',
  data: function () {
    return {
      record: {
        firstname: 'John',
        lastname: 'Doe'
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
    submit ({ context, prop, value }) {
      console.log('saving', context, prop, value)
      context[prop] = value
    },
    cancel (props) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>

</style>
