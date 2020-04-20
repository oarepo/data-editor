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
    isArrayItem () {
      return Array.isArray(this.context)
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
          op: this.context[this.prop] === undefined ? 'add' : this.patchOperation,
          context: this.context,
          prop: this.prop
        }
        this.extraProps.submit(submitData)
        this.$emit('done')
      })
    },
    async remove () {
      const removeData = {
        // path: this.path,
        op: 'remove',
        context: this.context,
        prop: this.prop,
        valueIndex: this.valueIndex
      }
      this.extraProps.submit(removeData)
      this.$emit('done')
    },
    async cancel () {
      this.$emit('done')
    }
  }
}
