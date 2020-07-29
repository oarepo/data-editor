<template lang="pug">
data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'non-existing-object-default-value-edit',
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        showEmpty: true,
        children: [
          {
            prop: 'object',
            additionalProps: { defaultValue: { creator: 'Mary Black' } },
            children: [
              {
                prop: 'creator'
              }
            ]
          }]
      }
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      // console.log({ context, prop, value, op })
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          console.log(context, prop, value)
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        if (Array.isArray(context)) {
          context.splice(prop, 1, value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel () {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>

</style>
