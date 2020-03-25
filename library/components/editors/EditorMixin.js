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
    // parentJSONPointer: String,
    schema: String,
    currentSchema: Object,
    // valueIndex: Number,
    patchOperation: {
      type: String,
      default: 'replace'
    },
    // jsonPointer: String,
    // patchTransformer: Function,
    // submit: Function,
    // cancel: Function,
    dialogComponent: Object
  },
  computed: {
    hasDialog () {
      return !!this.currentDialogComponent
    },
    // hasDefaultValue () {
    //   return !!this.defaultValue
    // },
    currentValue () {
      return this.context[this.prop]
    },
    // defaultValue () {
    //   // console.log('this.layout.additionalProps.defaultValue', this.layout.additionalProps.defaultValue)
    //   let dv
    //   if (this.layout.additionalProps && this.layout.additionalProps.defaultValue) {
    //     dv = this.layout.additionalProps.defaultValue
    //   } else if (this.layout.defaultValue) {
    //     dv = this.layout.defaultValue
    //   }
    //   if (dv === null || dv === undefined) {
    //     return dv
    //   }
    //   if (dv instanceof Function) {
    //     return dv(this.$props)
    //   } else {
    //     return dv
    //   }
    // },
    currentDialogComponent () {
      console.log(this.extraProps, this.layout)
      const layout = this.layout
      if (layout.additionalProps && layout.additionalProps.dialogComponent) {
        return layout.additionalProps.dialogComponent
      }
      if (this.extraProps.dialogComponent) {
        return this.extraProps.dialogComponent
      }
      if (layout.dialogComponent) {
        return layout.dialogComponent
      }
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
      this.editing = true
    },
    // async startEditing () {
    //   const dv = await this.defaultValue
    //   if (dv) {
    //     this.addDefaultValue(dv)
    //   } else {
    //     this.editing = true
    //     this.$nextTick(() => {
    //       console.log(this.$refs)
    //       this.$refs.edit.startEditing()
    //     })
    //   }
    // },
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
      console.log('submitData')
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
    // openDialog (initialValue = null, errorMessage = null) {
    //   this.$q.dialog({
    //     component: this.currentDialogComponent,
    //     parent: this,
    //     initialValue: initialValue,
    //     errorMessage: errorMessage
    //   }).onOk((value) => {
    //     try {
    //       this.validate(value)
    //       this.submitData(value)
    //     } catch (e) {
    //       this.openDialog(value, e.message)
    //     }
    //   })
    // },
    async editChange (value) {
      if (this.isBool) {
        await this.save()
      }
    }
    // addDefaultValue (dv) {
    //   this.validate(dv)
    //   this.submitData(dv)
    // },
    // validate (value) {
    // }
  }
}
