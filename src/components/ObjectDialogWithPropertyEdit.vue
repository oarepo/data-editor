<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DialogWithPropertyComponent from './DialogWithPropertyComponent'

export default {
  name: 'object-dialog-with-property-edit',
  data: function () {
    return {
      record: {
        object: {
          creator: 'Mary Black'
        }
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
            additionalProps: { dialogComponent: DialogWithPropertyComponent },
            children: [{ prop: 'creator' }]
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
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>

</style>
