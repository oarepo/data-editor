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
    parentJSONPointer: String,
    schema: String,
    currentSchema: Object,
    valueIndex: Number,
    patchOperation: {
      type: String,
      default: 'replace'
    },
    jsonPointer: String,
    patchTransformer: Function,
    submit: Function,
    cancel: Function,
    dialogComponent: Object
  },
  computed: {
    currentJsonPointer () {
      if (this.jsonPointer) {
        return this.jsonPointer
      }
      if (this.valueIndex) {
        return this.pathValues[this.valueIndex]
      }
      return `${this.parentJSONPointer}/${this.layout.path}`
    },
    isArray () {
      return Array.isArray(this.context)
    },
    isUndefinedObjectOrValue () {
      return !this.isArray && this.pathValues === undefined
    },
    isObject () {
      const value = this.context[this.layout.path]
      return Object(value) === value
    },
    isBool () {
      const value = this.context[this.layout.path]
      return Boolean(value) === value
    }
  },
  data: function () {
    return {
      editing: false
      // showDialogs: false
    }
  },
  methods: {
    startEditing () {
      console.log(this.options)
      console.log('fdsdf')
      this.editing = true
    },
    onCancel () {
      console.log('aaa')
      this.editing = false
      this.$emit('stop-editing')
      this.extraProps.cancel(this.$props)
    },
    async save () {
      console.log('bbb', this.editedValue)
      const submitData = {
        // path: this.path,
        value: this.editedValue,
        op: this.patchOperation,
        context: this.context,
        prop: this.prop
      }
      console.log(submitData)
      this.editing = false
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
      this.editing = false
      this.$emit('stop-editing')
      this.extraProps.submit(removeData)
    },
    async editChange (value) {
      if (this.isBool) {
        await this.save()
      }
    }
  }
}
