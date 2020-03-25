<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="{}")
</template>

<script>
import DataEditorComponent from '../../library/components/DataEditorComponent'
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
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      console.log(context, prop, value, op, context[prop])
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          context[prop] = value
        }
      }
      if (op === 'replace') {
        context[prop] = value
        console.log(context[prop])
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
