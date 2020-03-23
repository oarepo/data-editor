<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout" :dialog-component="dialogComponent")
  // data-renderer(:renderer-components="currentRendererComponents")
</template>

<script>
import DataEditorComponent from '../../library/components/DataEditorComponent'
// import DialogComponent from './DialogComponent'
import Vue from 'vue'
import DialogWithPropertyComponent from './DialogWithPropertyComponent'

export default {
  name: 'simple-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {
        object: {
          firstname: 'John',
          lastname: 'Doe'
        },
        secondObject: {
          a: 'b',
          b: 1
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
            additionalProps: true
          },
          {
            prop: 'secondObject'
            // additionalProps: true
          }
        ]
      },
      dialogComponent: DialogWithPropertyComponent
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      console.log(context, prop, value)
      if (op === 'add') {
        console.log(context[prop])
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
