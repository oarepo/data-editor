<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
  // data-renderer(:renderer-components="currentRendererComponents")
</template>

<script>
import DataEditorComponent from '../../library/components/DataEditorComponent'
import Vue from 'vue'

export default {
  name: 'simple-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {
        a: {
          firstname: 'John',
          lastname: 'Doe'
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
        showEmpty: true
      }
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      if (op === 'add') {
        Vue.set(context, prop, value)
      }
      if (op === 'replace') {
        if (context[prop] === undefined) {
          Vue.set(context, prop, value)
        } else {
          context[prop] = value
        }
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
