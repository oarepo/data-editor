<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
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
        contact: {
          phone: '+420123123123',
          pmail: 'mary.black@gmail.com'
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
      isNaN(value)
      if (op === 'add') {
        Vue.set(context, prop, value)
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
