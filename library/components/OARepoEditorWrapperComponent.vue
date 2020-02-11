<template lang="pug">
div
  div.row(v-if="!editing")
    view-renderer.col(:def="layout" :props="this.$props" code="value-viewer" @dblclick.native="startEditing" ref="viewer")
    q-btn(icon="remove" color="primary" size="x-small" dense flat v-if="isArray" @click="onRemove")
    q-btn(icon="edit" color="primary" size="x-small" dense flat v-if="layout && !layout.disabled && !isObject" @click="startEditing")
  div.row(v-else)
    edit-renderer(:def="layout" :props="this.$props" code="value-editor" ref="editor")
    div.q-mt-sm
      q-btn(icon="done" color="primary" @click="save" outline) Uložit
      q-btn.q-ml-sm(icon="clear" color="grey" @click="onCancel" outline) Storno
</template>
<script>

import { RendererMixin } from '@oarepo/data-renderer'

const ViewRenderer = {
  mixins: [
    RendererMixin
  ],
  props: {
    def: Object,
    props: Object,
    code: String
  },
  render (h) {
    const collected = {}
    const els = this.renderElement(collected, h, this.def, this.code,
      this.props, () => {
        const value = this.props.context[this.props.layout.path]
        if (value === undefined) {
          return ['---']
        }
        if (Array.isArray(value)) {
          return []
        }
        if (Object(value) === value) {
          if (!Object.keys(value).length) {
            return []
          } else {
            return [JSON.stringify(value)]
          }
        }
        return [value]
      })
    return els[0]
  },
  computed: {
    currentSchemaCode () {
      return this.props.schema
    }
  }
}

const EditRenderer = {
  mixins: [
    RendererMixin
  ],
  props: {
    def: Object,
    props: Object,
    code: String
  },
  data: function () {
    return {
      editedValue: null
    }
  },
  mounted () {
    this.editedValue = this.props.value
    if (this.editedValue === undefined) {
      if (this.def.default !== undefined) {
        if (this.def.default instanceof Function) {
          this.editedValue = this.def.default(this.props)
        } else {
          this.editedValue = this.def.default
        }
      }
    }
    if (this.$children[0]) {
      if (this.$children[0].focus) {
        this.$children[0].focus()
      }
      if (this.$children[0].select) {
        this.$children[0].select()
      }
    }
  },
  render (h) {
    const vue = this
    const collected = {}
    const props = {
      ...this.props,
      value: this.editedValue
    }
    const els = this.renderElement(collected, h, this.def, this.code,
      props, () => {
        return []
      }, null, {
        on: {
          input: vue.valueInput
        }
      }, {
        ref: 'editor'
      })

    return els[0]
  },
  computed: {
    currentSchemaCode () {
      return this.props.schema
    }
  },
  methods: {
    valueInput (value) {
      this.editedValue = value
    }
  }
}

export default {
  name: 'oarepo-editor-wrapper-component',
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
  components: {
    'view-renderer': ViewRenderer,
    'edit-renderer': EditRenderer
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
    onCancel () {
      this.editing = false
      this.$emit('stop-editing')
      this.cancel(this.$props)
    },
    async save () {
      const submitData = {
        path: this.currentJsonPointer,
        value: this.$refs.editor.editedValue,
        op: this.patchOperation,
        context: this.context,
        prop: this.layout.path,
        pathValues: this.pathValues
      }
      console.log('submit', submitData)
      this.editing = false
      this.$emit('stop-editing')
      this.submit(submitData)
    },
    async onRemove () {
      const removeData = {
        path: this.currentJsonPointer,
        op: 'remove',
        context: this.context,
        prop: this.layout.path,
        valueIndex: this.valueIndex
      }
      console.log('remove', removeData)
      this.editing = false
      this.$emit('stop-editing')
      this.submit(removeData)
    }
  }
}
</script>
