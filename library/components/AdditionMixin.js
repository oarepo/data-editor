export default {
  props: {
    context: [Object, Array],
    layout: Object,
    data: Object,
    paths: Array,
    value: {},
    url: String,
    values: Array,
    pathValues: Array,
    pathLayouts: [Object, Array],
    schema: String,
    currentSchema: Object,
    valueIndex: Number,
    parentJSONPointer: String,
    submit: Function,
    cancel: Function,
    dialogComponent: Object
  },
  computed: {
    hasDialog () {
      return !!this.currentDialogComponent
    },
    hasDefaultValue () {
      return !!this.defaultValue
    },
    currentValue () {
      return this.context[this.prop]
    },
    defaultValue () {
      const dv = this.layout.defaultValue
      if (dv === null || dv === undefined) {
        return dv
      }
      if (dv instanceof Function) {
        return dv(this.$props)
      } else {
        return dv
      }
    },
    currentJSONPointer () {
      return `${this.parentJSONPointer}/${this.layout.path}`
    },
    currentDialogComponent () {
      // console.log(this.extraProps)
      return this.layout.dialogComponent || this.extraProps.dialogComponent
    }
  },
  data: function () {
    return {
      editing: false
    }
  },
  methods: {
    async startEditing () {
      const dv = await this.defaultValue
      if (dv) {
        this.addDefaultValue(dv)
      } else {
        this.editing = true
        this.$nextTick(() => {
          this.$refs.edit.startEditing()
        })
      }
    },
    stopEditing () {
      this.editing = false
    },
    openDialog (initialValue = null, errorMessage = null) {
      this.$q.dialog({
        component: this.currentDialogComponent,
        parent: this,
        initialValue: initialValue,
        errorMessage: errorMessage
      }).onOk((value) => {
        try {
          this.validate(value)
          this.submitData(value)
        } catch (e) {
          this.openDialog(value, e.message)
        }
      })
    },
    addDefaultValue (dv) {
      this.validate(dv)
      this.submitData(dv)
    },
    validate (value) {
    }
  }
}
