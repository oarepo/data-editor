<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'complex-array-with-layout-edit',
  data: function () {
    return {
      record: {
        contact: [
          { phone: '+420123123124' },
          { phone: '+420123123125' },
          { phone: '+4201231231246' }]
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
            prop: 'contact',
            label: {
              label: 'listOfContacts'
            },
            item: {
              label: {
                label: 'phoneNumber'
              },
              prop: 'phone'
            }
          }
        ]
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
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
