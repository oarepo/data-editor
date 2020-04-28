<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'boolean-edit',
  data: function () {
    return {
      record: {
        creator: 'Mary Black',
        finished: true,
        published: false
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {}
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
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
