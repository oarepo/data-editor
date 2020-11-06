import ArrayDialogComponent from './ArrayDialogComponent.vue'
import ObjectDialogComponent from './ObjectDialogComponent.vue'

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
      if (Object.prototype.toString.call(this.value) === '[object Array]') {
        return ArrayDialogComponent
      }
      else {
        return ObjectDialogComponent
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
    async addDefaultValue () {
      const dv = await this.defaultValue
      this.addValue(dv)
    },
    stopEditing () {
      this.editing = false
    },
    openDialog (layout = null, errorMessage = null) {
      this.$q.dialog({
        component: this.currentDialogComponent,
        parent: this,
        layout: layout,
        paths: this.paths,
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
    addValue (dv) {
      this.validate(dv)
      this.submitData(dv)
    },
    validate (value) {
      console.log(value)
    },
    createComplexValue () {
      let value = this.layout.children ? {} : []
      if (this.layout.childrenProps !== undefined) {
        const submittedData = {
          op: 'add',
          context: this.context,
          value: this.layout.childrenProps,
          prop: this.prop,
          paths: this.paths
        }
        this.extraProps.submit(submittedData)
      } else {
        const submittedData = {
          op: 'add',
          context: this.context,
          value: value,
          prop: this.prop,
          paths: this.paths
        }
        this.extraProps.submit(submittedData)
      }
    }
  }
}
