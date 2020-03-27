<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DataEditorComponent from '../../library/components/DataEditorComponent'

export default {
  name: 'non-existing-default-value-array-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        showEmpty: true,
        children: [
          {
            prop: 'array',
            additionalProps: { defaultValue: () => 8 },
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
      // layout: [{ 'path': 'a', 'label': 'a', defaultValue: () => 8, array: true }]
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      console.log(context, prop, value, context[prop])
      if (op === 'add') {
        if (Array.isArray(context)) {
          context[prop].push(value)
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
