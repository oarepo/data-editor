<template lang="pug">
div
  div
    span Display schema:
    q-radio(v-model="options.schema" val="inline" label="inline" color="yellow")
    q-radio(v-model="options.schema" val="block" label="block" color="yellow")
    q-radio(v-model="options.schema" val="table" label="table" color="yellow")
    q-radio(v-model="options.schema" val="flex" label="flex" color="yellow")
  hr
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'tree-edit',
  data: function () {
    return {
      record: {
        object: [
          { creator: 'Mary Black' },
          {
            contact: [
              { phone: '+420123123123' },
              { email: ['mary.black@gmail.com'] }]
          }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        children: [
          {
            prop: 'object',
            additionalProps: { defaultValue: () => ({ keywords: ['first keyword', 'second keyword'] }) }
          }
        ]
      }
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
