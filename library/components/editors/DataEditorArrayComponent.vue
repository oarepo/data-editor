<template lang="pug">
component.iqde-array-container(:is="rootComponent" class="iqde-root-component")
  template(v-if="hasValue")
    data-renderer-array-component(v-bind="$props" :class="{'iqde-selected': hover}")
    div.iqde-buttons
      q-btn(icon="add" label="default value" dense flat color="primary" @click="addDefaultValue()" v-if="hasDefaultValue")
      q-btn(icon="playlist_add" dense flat color="primary" @click="openDialog(layout)" v-if="hasDialog")
      q-btn(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="removeDialog" @mouseenter="hover=true" @mouseleave="hover=false")
  template(v-else)
    q-btn(icon="playlist_add" dense flat color="primary" @click="createComplexValue()") Vytvořit
    q-btn(icon="remove" dense flat color="primary" size="x-small" v-if="isArrayItem" @click="removeDialog" @mouseenter="hover=true" @mouseleave="hover=false")
</template>

<script>
import EditorMixin from './EditorMixin'
import AdditionMixin from './AdditionMixin'
import { ArrayComponent } from '@oarepo/data-renderer'
import DeletionMixin from './DeletionMixin'

export default {
  name: 'data-editor-array-component',
  mixins: [EditorMixin, AdditionMixin, DeletionMixin],
  components: {
    'data-renderer-array-component': ArrayComponent
  },
  props: {
    options: Object,
    value: Array,
    paths: Array,
    schema: {
      type: String,
      default: 'inline'
    },
    layout: Object,
    pathLayouts: Object,
    rendererComponents: Object
  },
  data: function () {
    return {
      addedValue: null,
      hover: false
    }
  },
  methods: {
    submitData (value) {
      const submittedData = {
        op: 'add',
        context: this.currentValue,
        value: value,
        paths: this.paths
      }
      this.extraProps.submit(submittedData)
      this.$emit('done')
    }
  }
}
</script>
