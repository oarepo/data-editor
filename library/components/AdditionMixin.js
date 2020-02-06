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
    currentValue () {
      return this.context[this.layout.path]
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
      return this.layout.dialogComponent || this.dialogComponent
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
      console.log(dv)
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
    openDialog () {
      this.$q.dialog({
        component: this.layout.dialogComponent || this.dialogComponent,
        parent: this
      }).onOk((value) => {
        this.submitData(value)
      })
    },
    addDefaultValue (dv) {
      this.submitData(dv)
    }
  }
}
