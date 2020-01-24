<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'DefaultValueComplexArrayEdit',
  data: function () {
    return {
      record: {
        complexArray: [{ a: 1 }, { b: 2 }, { c: 3 }]
        // complexArray: [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]
      },
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        pathLayouts: {
          complexArray: {
            defaultValue: () => 10
          }
        }
        // pathLayouts: {
        //   complexArray: {
        //     defaultValue: { a: '1' },
        //     children: ['a']
        //     // defaultValue: { a: '1', b: null, c: 'a', d: 'b' },
        //     // children: ['a', 'b', 'c', 'd']
        //   }
        // }
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      console.log('saving', context, prop, value, path, pathValues)
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          context[prop] = value
        }
        // if (Array.isArray(context)) {
        //   console.log('prop', context)
        //   console.log('arr', value, context[0].a)
        //   if (typeof context[0] === 'object') {
        //     context[0]['b'] = value
        //   }
        // }
        // context[prop] = value
        console.log(context, prop, value)
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
