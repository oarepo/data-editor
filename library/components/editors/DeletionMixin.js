import DeleteDialogComponent from './DeleteDialogComponent'

export default {
  computed: {
    isArrayItem () {
      return Array.isArray(this.context)
    }
  },
  methods: {
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
    async removeDialog (errorMessage = null) {
      this.$q.dialog({
        component: DeleteDialogComponent,
        parent: this,
        errorMessage: errorMessage
      }).onOk(() => {
        this.remove()
      })
    }
  }
}
