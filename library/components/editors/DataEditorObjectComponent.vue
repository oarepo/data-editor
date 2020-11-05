<template lang="pug">
component(:is="rootComponent" class="iqde-root-component")
  div.iqde-object-container(v-if="hasValue")
    data-renderer-object-component(v-bind="$props" :class="{'iqde-selected': hover}")
    div.iqde-buttons
      q-btn(icon="add" label="default value" dense flat color="primary" @click="addDefaultValue()" v-if="hasDefaultValue")
      q-btn(icon="playlist_add" dense flat color="primary" @click="openDialog(layout)" v-if="hasDialog")
      q-btn(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="removeDialog" @mouseenter="hover=true" @mouseleave="hover=false")
  div(v-else)
    q-btn(icon="playlist_add" dense flat color="primary" @click="createComplexValue()") Vytvořit
    q-btn(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="removeDialog" @mouseenter="hover=true" @mouseleave="hover=false")
</template>

<script>
import EditorMixin from './EditorMixin'
import AdditionMixin from './AdditionMixin'
import { ObjectComponent } from '@oarepo/data-renderer'
import DeletionMixin from './DeletionMixin'

export default {
  name: 'data-editor-object-component',
  mixins: [EditorMixin, AdditionMixin, DeletionMixin],
  components: {
    'data-renderer-object-component': ObjectComponent
  },
  props: {
    options: Object,
    value: Object,
    paths: Array,
    schema: {
      type: String,
      default: 'inline'
    },
    layout: Object,
    pathLayouts: Object,
    rendererComponents: Object
  },
  computed: {
    hasAdditionalProps () {
      return !!this.layout.additionalProps
    }
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    submitData (value) {
      if (value === undefined || value === null) {
        this.$emit('done')
        return
      }
      if (Object.prototype.toString.call(value) === '[object String]') {
        const submittedData = {
          op: 'add',
          context: this.context,
          value: this.getPrimitiveValue(value),
          prop: this.prop,
          paths: this.paths
        }
        this.extraProps.submit(submittedData)
      } else {
        Object.keys(value).forEach(prop => {
          const submittedData = {
            op: 'add',
            context: this.currentValue,
            value: this.getPrimitiveValue(value[prop]),
            prop: prop,
            paths: this.paths
          }
          this.extraProps.submit(submittedData)
        })
      }
      this.$emit('done')
    }
  }
}
</script>

<style scoped>

</style>
