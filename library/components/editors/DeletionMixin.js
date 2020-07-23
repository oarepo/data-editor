import DeleteDialogComponent from './DeleteDialogComponent.vue'

export default {
  computed: {
    isArrayItem () {
      return Array.isArray(this.context)
    }
  },
  methods: {
    async remove () {
      const removeData = {
        op: 'remove',
        context: this.context,
        prop: this.prop,
        valueIndex: this.valueIndex,
        paths: this.paths
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
