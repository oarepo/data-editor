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
      if (this.layout === undefined || this.layout.value === undefined) {
        if (this.schema === 'table') {
          return 'td'
        }
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
          value: this.getPrimitiveValue(this.editedValue),
          op: 'replace',
          context: this.context,
          prop: this.prop,
          paths: this.paths
        }
        this.extraProps.submit(submitData)
        this.$emit('done')
      })
    },
    async cancel () {
      this.$emit('done')
    },
    getPrimitiveValue (value) {
      if (Object.prototype.toString.call(value) === '[object String]') {
        if (+value === +value) {
          return parseInt(value)
        } else {
          return value
        }
      } return value
    }
  }
}
