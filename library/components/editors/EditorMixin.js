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
    dialogComponent: Object
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
  data: function () {
    return {
      editing: false
    }
  },
  methods: {
    startEditing () {
      this.editing = true
    },
    onCancel () {
      if (this.editing) {
        this.editing = false
      } else {
        this.$parent.editing = false
      }
      this.$emit('stop-editing')
      this.$parent.extraProps.cancel(this.$props)
    },
    async save () {
      const submitData = {
        // path: this.path,
        value: this.editedValue,
        op: this.patchOperation,
        context: this.context,
        prop: this.prop
      }
      this.$parent.editing = false
      this.$emit('stop-editing')
      this.extraProps.submit(submitData)
    },
    async onRemove () {
      const removeData = {
        path: this.currentJsonPointer,
        op: 'remove',
        context: this.context,
        prop: this.prop,
        valueIndex: this.valueIndex
      }
      this.$parent.editing = false
      this.$emit('stop-editing')
      this.extraProps.submit(removeData)
    },
    async changeBool (value) {
      if (this.isBool) {
        await this.save()
      }
    }
  }
}
