import Vue from 'vue'

export default {
  computed: {
    hasDialog () {
      return !!this.currentDialogComponent
    },
    currentDialogComponent () {
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
    },
    hasDefaultValue () {
      return !!this.defaultValue
    },
    defaultValue () {
      let dv
      if (this.layout.additionalProps && this.layout.additionalProps.defaultValue) {
        dv = this.layout.additionalProps.defaultValue
      } else if (this.layout.defaultValue) {
        dv = this.layout.defaultValue
      }
      if (dv === null || dv === undefined) {
        return dv
      }
      if (dv instanceof Function) {
        return dv(this.$props)
      } else {
        return dv
      }
    },
    hasValue () {
      return !!this.value
    }
  },
  data: function () {
    return {
      editing: false
    }
  },
  methods: {
    async beforeStart () {
      const dv = await this.defaultValue
      if (dv) {
        this.addDefaultValue(dv)
      } else {
        this.editing = true
        await Vue.nextTick()
        if (this.$refs.editor) {
          const input = this.$refs.editor.$refs.input
          if (input.focus) {
            input.focus()
          }
          if (input.select) {
            input.select()
          }
        }
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
    },
    createComplexValue () {
      const submittedData = {
        op: 'add',
        context: this.context,
        value: this.layout.children ? {} : [],
        prop: this.prop
      }
      this.extraProps.submit(submittedData)
    }
  }
}
