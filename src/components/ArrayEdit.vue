<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import DataEditorComponent from '../../library/components/DataEditorComponent'
import Vue from 'vue'
export default {
  name: 'array-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {
        array: [1, 2]
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
            prop: 'array',
            label: {
              label: 'Array label'
            },
            item: {
              label: {
                label: 'Item label'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      console.log(context, prop, value, op, context[prop])
      if (op === 'add') {
        if (Array.isArray(context[prop])) {
          context[prop].push(value)
        } else {
          context[prop] = value
        }
      }
      if (op === 'replace') {
        Vue.set(context, prop, value)
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
