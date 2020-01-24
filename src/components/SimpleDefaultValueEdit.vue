<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
export default {
  name: 'SimpleDefaultValueEdit',
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
      layout: {
        defaultValue: { firstname: 'a', lastname: 'b' },
        children: ['firstname', 'lastname']
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
