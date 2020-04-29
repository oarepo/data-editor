export default {
  name: 'editor-mixin',
  props: {
    pathLayouts: Object,
    rendererComponents: Object,
    extraProps: Object,
    prop: [String, Number],
    context: [Object, Array],
    layout: Object,
    value: {},
    patchOperation: {
      type: String,
      default: 'replace'
    },
    schema: {
      type: String,
      default: 'inline'
    },
    level: Number
  },
  computed: {
    currentValue () {
      return this.context[this.prop]
    },
    rootComponent () {
      if (this.layout === undefined) {
        return 'div'
      }
      return this.layout.value.element
    }
  },
  mounted () {
    this.editedValue = this.value
  },
  data: function () {
    return {
      editedValue: null
    }
  },
  methods: {
    async save () {
      this.$nextTick(() => {
        const submitData = {
          // path: this.path,
          value: this.editedValue,
          op: 'replace',
          context: this.context,
          prop: this.prop,
          paths: this.paths
        }
        console.log(submitData)
        this.extraProps.submit(submitData)
        console.log('a')
        this.$emit('done')
      })
    },
    async cancel () {
      this.$emit('done')
    }
  }
}
