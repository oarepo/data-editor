<template lang="pug">
div
  data-editor-component(:record="record" :options="options" :layout="layout")
  // data-renderer(:renderer-components="currentRendererComponents")
</template>

<script>
import DataEditorComponent from '../../library/components/DataEditorComponent'
// import DialogComponent from './DialogComponent'
import Vue from 'vue'
import DialogWithPropertyComponent from './DialogWithPropertyComponent'

function defaultValue ({ context, layout }) {
  for (const prop of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    if (context[layout.prop][prop] === undefined) {
      return { prop: prop, value: 1 }
    }
  }
}

export default {
  name: 'simple-edit',
  components: { DataEditorComponent },
  data: function () {
    return {
      record: {
        a: {
          firstname: 'John',
          lastname: 'Doe'
        },
        b: {
          a: null
        },
        c: {},
        e: {
          a: null
        },
        f: {}
      },
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
            prop: 'a',
            label: { label: 'a' },
            additionalProps: { dialogComponent: DialogWithPropertyComponent }
          },
          {
            prop: 'b',
            label: { label: 'b' },
            additionalProps: { defaultValue: defaultValue }
          },
          {
            prop: 'c',
            label: { label: 'c' },
            additionalProps: { defaultValue: { a: 1 } }
          },
          {
            prop: 'd',
            label: { label: 'd' },
            additionalProps: { defaultValue: { value: 1, prop: 'a' } },
            children: [
              { prop: 'a' }
            ]
          },
          {
            prop: 'e',
            label: { label: 'e' },
            children: []
          }
        ]
      }
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      console.log(context, prop, value, context[prop])
      if (op === 'add') {
        console.log('aaa', context[prop])
        Vue.set(context, prop, value)
      }
      if (op === 'replace') {
        if (context[prop] === undefined) {
          console.log('ttt')
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
