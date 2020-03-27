// import { RendererMixin } from '@oarepo/data-renderer'

export default {
  name: 'editor-mixin',
  props: {
    context: [Object, Array],
    layout: Object,
    data: Object,
    paths: Array,
    value: {},
    url: String,
    values: Array,
    pathValues: Array,
    schema: String,
    currentSchema: Object,
    // valueIndex: Number,
    patchOperation: {
      type: String,
      default: 'replace'
    },
    dialogComponent: Object
  },
  computed: {
    currentValue () {
      return this.context[this.prop]
    },
    isArrayItem () {
      return Array.isArray(this.context)
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
      console.log('submitData', submitData, this.$root.editing)
      this.$parent.editing = false
      console.log(this.editing, this)
      this.$emit('stop-editing')
      this.extraProps.submit(submitData)
    },
    async onRemove () {
      const removeData = {
        path: this.currentJsonPointer,
        op: 'remove',
        context: this.context,
        prop: this.layout.path,
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
